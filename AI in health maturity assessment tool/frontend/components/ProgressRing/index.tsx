/** @jsxImportSource @emotion/react */
import { brandColor, green, greyLight } from "../../assets/styles/colors";
import {
  progressRingContainerStyle,
  progressRingStyle,
  StyledCircle,
  progressRingNumbersStyle,
  progressRingScoreMaxStyle,
  StyledText,
} from "./styles";

interface IProgressRingProps {
  radius?: number;
  stroke?: number;
  score: number;
  scoreDynamic: number;
  scoreMax: number;
  mouseover?: () => void;
}

const ProgressRing = ({
  radius = 70,
  stroke = 6,
  score,
  scoreDynamic,
  scoreMax,
  mouseover,
}: IProgressRingProps): React.ReactElement => {
  const progress = (scoreDynamic * 100) / scoreMax;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const strokeDashoffsetBgRing = circumference - 1 * circumference;

  return (
    <div
      css={progressRingContainerStyle}
      onMouseOver={mouseover}
      onFocus={mouseover}
    >
      <svg height={radius * 2} width={radius * 2}>
        <StyledCircle
          css={progressRingStyle}
          stroke={greyLight}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffsetBgRing}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <StyledCircle
          css={progressRingStyle}
          stroke={scoreDynamic > score ? green : brandColor}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div css={progressRingNumbersStyle}>
        <StyledText scoreDynamic={scoreDynamic} score={score}>
          {scoreDynamic}
        </StyledText>
        <p css={progressRingScoreMaxStyle}>/ {scoreMax}</p>
      </div>
    </div>
  );
};

export default ProgressRing;
