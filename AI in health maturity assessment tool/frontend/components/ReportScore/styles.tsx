import styled from "@emotion/styled";

import { brandColor, greyDark, greyLight } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

// HEADER
export const reportScoreHeaderStyle = {
  display: "flex",
  flexDirection: "column" as const,
  position: "relative" as const,
  alignItems: "center" as const,
  marginBottom: 15,

  [mq[1]]: {
    marginBottom: 30,
    flexDirection: "row" as const,
  },
};
export const reportScoreHeadingStyle = {
  marginLeft: 25,
};

// AREA CUSTOMIZATION
export const reportScoreCustomizationListStyle = {
  margin: 0,
  paddding: 0,
};

// CREDITS
export const reportScoreCreditStyle = {
  position: "relative" as const,
};

export const reportScoreCreditTitleStyle = {
  display: "flex",
  position: "relative" as const,
  alignItems: "center" as const,
  marginBottom: 15,

  [mq[1]]: {
    marginBottom: 30,
  },
};

export const reportScoreCreditTitleTagStyle = {
  marginBottom: 0,
  paddingLeft: 15,
};

export const investTextStyle = {
  h2: { fontSize: 18 },
  p: { fontSize: 14 },
};

// INVEST
interface IStyledTextInvest {
  autoText?: boolean;
  autoInvest: boolean;
}

export const StyledTextInvest = styled.p<IStyledTextInvest>(
  ({ autoText = false, autoInvest }) => ({
    color: autoText
      ? !autoInvest
        ? greyDark
        : brandColor
      : autoInvest
      ? greyDark
      : brandColor,
    maxWidth: "calc(50% - 50px)",
    fontWeight: autoText ? (!autoInvest ? 300 : 900) : autoInvest ? 300 : 900,
  })
);

export const reportScoreInvestContainerStyle = {
  display: "none",
  alignItems: "center" as const,
  justifyContent: "space-around" as const,
  p: {
    margin: 0,
  },
};
export const reportScoreInvestCheckStyle = {
  appearance: "none" as const,
  margin: 0,
  width: 50,
  height: 10,
  backgroundColor: greyLight,
  borderRadius: 20,
  position: "relative" as const,

  "&:focus": {
    outline: "none",
  },
  "&::before": {
    content: `""`,
    position: "absolute" as const,
    width: 16,
    height: 16,
    border: `2px solid ${brandColor}`,
    borderRadius: "50%",
    top: "-50%",
    left: 0,
    transform: "translateX(-50%)",
    transition: "all .3s ease-out",
  },
  "&::after": {
    content: `""`,
    position: "absolute" as const,
    width: 10,
    height: 10,
    backgroundColor: brandColor,
    borderRadius: "50%",
    top: 0,
    left: 0,
    transform: "translateX(-50%)",
    transition: "all .3s ease-out",
  },

  // Checked state
  "&:checked": {
    "&::before, &::after": {
      transform: "translateX(calc(-50% + 40px))",
    },
  },
};
