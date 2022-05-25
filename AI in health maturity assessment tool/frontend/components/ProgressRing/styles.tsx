import styled from "@emotion/styled";
import { defaultTextColor, green, grey } from "../../assets/styles/colors";

export const progressRingContainerStyle = {
  position: "relative" as const,
  width: 140,
  height: 140,
};
export const progressRingStyle = {
  transition: "stroke-dashoffset 0.35s",
  transform: "rotate(-90deg)",
  transformOrigin: "50% 50%",
};
export const progressRingNumbersStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: {
    margin: 0,
    lineHeight: 1,
    textAlign: "center" as const,
  },
};
export const progressRingScoreMaxStyle = {
  fontSize: "1.3333333333em",
  color: grey,
};

interface IStyledCircle {
  strokeDashoffset: number;
}
export const StyledCircle = styled.circle<IStyledCircle>(
  ({ strokeDashoffset }) => ({
    ...progressRingStyle,
    strokeDashoffset,
  })
);

interface IStyledText {
  scoreDynamic: number;
  score: number;
}
export const StyledText = styled.p<IStyledText>(({ scoreDynamic, score }) => ({
  fontSize: "4em",
  fontWeight: 900,
  color: scoreDynamic > score ? green : defaultTextColor,
}));
