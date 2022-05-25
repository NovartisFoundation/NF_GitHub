/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import Button from "../Button";
import Actions from "../Actions";
import Question from "../Question";
import CurrentQuestion from "./CurrentQuestion";
import ProgressPillars from "./ProgressPillars";
import BadgesCollection from "../BadgesCollection";

import { assessmentStyles, assessmentQuestionsStyles } from "./styles";

import {
  addAnswerOnLocalStorage,
  getAnswerFromLocalStorage,
  addAreaCompletedOnLocalStorage,
  addActiveAssessmentOnLocalStorage,
  getTokenFromLocalStorage,
  getActiveAssessmentOnLocalStorage,
  getArrayActiveAssessmentOnLocalStorage,
} from "../../utils/localStorage";

import { Area, Position, AreaTypes, AreaDatas } from "../../utils/types";
import { addResults } from "../../libs/assessment";
import useWarnBeforeExitPage from "../../utils/useWarnBeforeExitPage";

interface IAssessmentProps {
  activeArea: AreaTypes;
  areasCompleted: Area[];
  assessment: AreaDatas[];
}

const Assessment = ({
  assessment,
  activeArea,
  areasCompleted,
}: IAssessmentProps): React.ReactElement => {
  const router = useRouter();
  const { t } = useTranslation();

  const [activeAssessment, setActiveAssessment] = useState<AreaDatas>();
  const [activePillar, setActivePillar] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPillars, setTotalPillars] = useState(0);

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isAreaFinished, setAreaFinished] = useState(false);

  const questions = activeAssessment?.pillars[activePillar].question || [];

  const getActiveAssessment = () =>
    assessment.find(({ slug }) => slug === activeArea);

  const getTotalPillar = () => activeAssessment?.pillars.length;
  const getTotalQuestions = (pillar) =>
    activeAssessment?.pillars[pillar].question.length;

  const goBack = () => {
    if (activeQuestion === 0 && activePillar === 0) {
      router.back(); // Go to area selection
      return;
    }

    if (activePillar > 0 && activeQuestion === 0) {
      // Go to previous pillar
      const previousPillar = activePillar - 1;

      setActivePillar(previousPillar);
      setActiveQuestion(getTotalQuestions(previousPillar) - 1);
      return;
    }

    // Go to previous question
    setActiveQuestion(activeQuestion - 1);
  };

  const goNext = async () => {
    addAnswerOnLocalStorage(activePillar, activeQuestion, activeAnswer);

    // Go to area completed
    if (
      activeQuestion + 1 === totalQuestions &&
      activePillar + 1 === totalPillars
    ) {
      setAreaFinished(true);
      setButtonDisabled(true); // Avoid multi-click
      addAreaCompletedOnLocalStorage(activeArea);

      // Get token from localStorage
      const token = getTokenFromLocalStorage();
      // Get score
      const totalScore = getActiveAssessmentOnLocalStorage();
      // Score by pillars
      const scoreByPillars = getArrayActiveAssessmentOnLocalStorage().map(
        (p, index) => ({
          slug: activeAssessment.pillars[index].slug,
          score: p.reduce(
            // Multiply by 1 to indicates that these are numbers, not strings
            (accumulator, currentValue) => accumulator + currentValue * 1,
            0
          ),
        })
      );
      // Save results to API
      const saved = await addResults(
        token,
        activeArea,
        totalScore,
        scoreByPillars
      );

      if (saved) {
        router.push(`/assessment-badge/${token}`);
        return;
      }
      // eslint-disable-next-line no-alert
      alert(
        "An error with the server occured. Your result hasn't been saved. Please contact an administrator."
      );
    }

    // Go to next pillar
    if (activeQuestion + 1 === totalQuestions) {
      setActiveQuestion(0);
      setActiveAnswer(null);
      setActivePillar(activePillar + 1);

      return;
    }

    // Go to next question
    setActiveQuestion(activeQuestion + 1);
  };

  useEffect(() => {
    setTotalPillars(getTotalPillar());
    setTotalQuestions(getTotalQuestions(activePillar));
  });

  useEffect(() => {
    setActiveAssessment(getActiveAssessment());
  }, [activeArea]);

  useEffect(() => {
    if (activeAssessment) addActiveAssessmentOnLocalStorage(activeAssessment);
  }, [activeAssessment]);

  useEffect(() => {
    setActiveAnswer(null);
    setButtonDisabled(true);

    const answer = getAnswerFromLocalStorage(activePillar, activeQuestion);

    if (answer !== null) {
      setButtonDisabled(false);
      setActiveAnswer(answer);
    }
  }, [activePillar, activeQuestion]);

  useEffect(() => {
    if (activeAnswer !== null) setButtonDisabled(false);
  }, [activeAnswer]);

  useWarnBeforeExitPage(
    !isAreaFinished,
    t("assessment:messageBeforeExitAssessment")
  );

  const backButtonComponent = (
    <Button
      isSecondary
      onClick={goBack}
      icon="chevron_left"
      iconSide={Position.Left}
      title={t("assessment:question.buttons.back")}
    />
  );

  return (
    <>
      <div css={assessmentStyles}>
        {activeAssessment && (
          <ProgressPillars
            activePillar={activePillar}
            totalPillars={totalPillars}
            pillars={activeAssessment.pillars}
          />
        )}

        <div css={assessmentQuestionsStyles}>
          {activeAssessment && (
            <CurrentQuestion
              activeQuestion={activeQuestion}
              totalQuestions={totalQuestions}
              question={questions[activeQuestion]}
            />
          )}

          {questions.map((question, index) => (
            <Question
              question={question}
              isActive={index === activeQuestion}
              key={`question-${index.toString()}`}
              setActiveAnswerCallback={setActiveAnswer}
              activeAnswer={getAnswerFromLocalStorage(activePillar, index)}
            />
          ))}
        </div>
      </div>

      <Actions>
        {activeQuestion === 0 && activePillar === 0 && (
          <div>{backButtonComponent}</div>
        )}
        <div>
          {!(activeQuestion === 0 && activePillar === 0) &&
            !isAreaFinished &&
            backButtonComponent}
          <Button
            onClick={goNext}
            isLoading={isAreaFinished}
            isDisabled={isButtonDisabled}
            title={t("assessment:question.buttons.next")}
          />
        </div>
      </Actions>

      <BadgesCollection areasCompleted={areasCompleted} />
    </>
  );
};

export default Assessment;
