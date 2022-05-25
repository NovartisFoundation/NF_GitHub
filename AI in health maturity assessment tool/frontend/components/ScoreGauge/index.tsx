/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { green, greyLight } from "../../assets/styles/colors";
import levels from "../../config/levels";
import { scoreMaximum } from "../../config/report";
import { Area, Level, Size } from "../../utils/types";
import Badge from "../Badge";
import {
  scoreGaugeControlsStyle,
  StyledTitle,
  scoreGaugeHeaderStyle,
  StyledControlMinus,
  StyledControlPlus,
  scoreGaugeStepsStyle,
  StyledStep,
  ScoreGaugeBadgeContainerStyle,
} from "./styles";

interface IGaugeProps {
  areaSlug: string;
  score: number;
  color: string;
  scoreMax?: number;
  scoreDynamic: number;
  setScoreDynamic: (string, number) => void;
  credits: number;
  setCredits: (number) => void;
}

const ScoreGauge = ({
  areaSlug,
  score,
  color,
  scoreMax = scoreMaximum,
  scoreDynamic,
  setScoreDynamic,
  credits,
  setCredits,
}: IGaugeProps): React.ReactElement => {
  const { t } = useTranslation();

  // Generate the steps in function of the score maximum and the actual score
  const steps = [];
  for (let i = 1; i <= scoreMax; i += 1) {
    if (i <= score)
      steps.push(
        <StyledStep
          color={color}
          key={`${areaSlug}-step-${i}`}
          id={`${areaSlug}-step-${i}`}
        />
      );
    else
      steps.push(
        <StyledStep
          color={greyLight}
          key={`${areaSlug}-step-${i}`}
          id={`${areaSlug}-step-${i}`}
        />
      );
  }

  // Score props
  const [plusIsdisabled, setPlusDisabled] = useState(false);
  const [minusIsdisabled, setMinusDisabled] = useState(true);

  // Change the background color and drop shadow depending of the bgColor parameter
  const changeStepStyle = (bgColor, index) => {
    const el = document.querySelector(
      `[id^=${areaSlug}-step]:nth-of-type(${index})`
    ) as HTMLElement;

    // Background color
    el.style.backgroundColor = bgColor;
    // Box shadow
    if (bgColor !== "#96DF73") {
      el.style.boxShadow = "none";
    } else el.style.boxShadow = `0 0 15px ${bgColor}`;
  };
  // Select the color in function of the index
  const setStepColor = () => {
    // Change step styles
    for (let i = score + 1; i <= steps.length; i += 1) {
      // if is colored
      if (i <= scoreDynamic) {
        // If this is green color
        changeStepStyle(green, i);
      } // If this is grey colored
      else changeStepStyle(greyLight, i);
    }
  };

  /* onClick functions */
  const onClickPlusBtn = () => {
    setScoreDynamic(areaSlug, scoreDynamic + 1);
    setCredits(credits - 1);
  };
  const onClickMinusBtn = () => {
    setScoreDynamic(areaSlug, scoreDynamic - 1);
    setCredits(credits + 1);
  };

  useEffect(() => {
    // Change step styles
    setStepColor();

    // disable minus button
    if (scoreDynamic === score) setMinusDisabled(true);
    else setMinusDisabled(false);
    // Enable plus button
    if (scoreDynamic === scoreMax || credits <= 0) setPlusDisabled(true);
    else setPlusDisabled(false);
  }, [scoreDynamic, credits]);

  return (
    <>
      <div css={scoreGaugeHeaderStyle}>
        <StyledTitle color={color}>{t(`areas.${areaSlug}`)}</StyledTitle>
        <div css={scoreGaugeControlsStyle}>
          <StyledControlMinus
            color={color}
            type="button"
            disabled={minusIsdisabled}
            onClick={() => onClickMinusBtn()}
          >
            Remove a credit
          </StyledControlMinus>
          <StyledControlPlus
            color={color}
            type="button"
            disabled={plusIsdisabled}
            onClick={() => onClickPlusBtn()}
          >
            Add a credit
          </StyledControlPlus>
        </div>
      </div>
      <ul css={scoreGaugeStepsStyle}>{steps}</ul>
      <ul css={ScoreGaugeBadgeContainerStyle}>
        <li>
          <Badge
            size={Size.Small}
            area={Area[areaSlug]}
            level={Level.exploring}
            disabled={score <= levels[Level.exploring] / 10}
          />
        </li>
        <li>
          <Badge
            size={Size.Small}
            area={Area[areaSlug]}
            level={Level.emerging}
            disabled={score < levels[Level.emerging] / 10}
          />
        </li>
        <li>
          <Badge
            size={Size.Small}
            area={Area[areaSlug]}
            level={Level.leader}
            disabled={score < levels[Level.leader] / 10}
          />
        </li>
      </ul>
    </>
  );
};

export default ScoreGauge;
