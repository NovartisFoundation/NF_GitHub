/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import Answer from "../Answer";
import ProgressAnswerImage from "./ProgressAnswerImage";

import {
  questionStyles,
  questionTextStyles,
  StyledQuestionAnswers,
} from "./styles";

import { QuestionDatas, QuestionTypes } from "../../utils/types";

interface IQuestionProps {
  isActive: boolean;
  activeAnswer: number;
  question: QuestionDatas;
  setActiveAnswerCallback: (score: number) => void;
}

const Question = ({
  question,
  isActive,
  activeAnswer,
  setActiveAnswerCallback,
}: IQuestionProps): React.ReactElement => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();

  const {
    type,
    question: { [locale]: label },
    answers,
  } = question;

  const [value, setValue] = useState<number>(null);
  const [score, setScore] = useState<number>(null);

  const isAnswerActive = (index) => {
    if (value === index) return true;
    if (type === QuestionTypes.image && index < value) return true;
    return false;
  };

  const onClick = (index) => {
    setValue(index);
  };

  useEffect(() => {
    setValue(null);

    if (isActive) {
      const index = answers.findIndex(
        (answer) => answer.score === activeAnswer
      );
      if (index >= 0) setValue(index);
    }
  }, [question, isActive]);

  useEffect(() => {
    if (value !== null) setScore(answers[value].score);
  }, [value]);

  useEffect(() => {
    if (value !== null) setActiveAnswerCallback(score);
  });

  return (
    isActive && (
      <div css={questionStyles}>
        <h3>{label}</h3>

        <p css={questionTextStyles}>
          {t(`assessment:question.subtitle.${type}`)}
        </p>

        <StyledQuestionAnswers
          totalAnswers={answers.length}
          hasColumn={type === QuestionTypes.image}
        >
          {type === QuestionTypes.image && (
            <ProgressAnswerImage size={value} maxSize={answers.length} />
          )}

          {answers.map((answer, index) => (
            <Answer
              type={type}
              index={index}
              answer={answer}
              totalAnswers={answers.length}
              onClick={() => onClick(index)}
              isActive={isAnswerActive(index)}
              key={`answer-${index.toString()}`}
            />
          ))}
        </StyledQuestionAnswers>
      </div>
    )
  );
};

export default Question;
