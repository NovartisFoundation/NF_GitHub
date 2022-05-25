import styled from "@emotion/styled";
import { grey, greyDark, greyLight } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

// HEADER
export const scoreGaugeHeaderStyle = {
  width: "100%",
  position: "relative" as const,
};

export const scoreGaugeControlsStyle = {
  position: "absolute" as const,
  width: "100%",
  display: "flex",
  justifyContent: "space-between" as const,
  top: 0,
  left: 0,
};
export const scoreGaugeControlStyle = {
  padding: 0,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textIndent: "-2000%",
  width: 20,
  height: 20,
  borderRadius: "50%",
  cursor: "pointer",
  position: "relative" as const,
  backgroundColor: grey,
  transition: "background .3s ease-out",

  "&:disabled": {
    backgroundColor: greyLight,

    "&::before, &::after": {
      backgroundColor: grey,
    },
  },
  "&::before": {
    content: `""`,
    height: 2,
    width: 7,
    backgroundColor: greyDark,
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "background .3s ease-out",
  },
  "&:hover::before": {
    backgroundColor: "#ffffff",
  },

  "&:hover:disabled::before": {
    backgroundColor: grey,
  },
  "&:hover:disabled": {
    backgroundColor: greyLight,
    cursor: "not-allowed",
  },
};

const controlPlusStyle = {
  "&::after": {
    content: `""`,
    width: 2,
    height: 7,
    backgroundColor: greyDark,
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "background .3s ease-out",
  },
  "&:hover::after": {
    backgroundColor: "#ffffff",
  },
  "&:hover:disabled::after": {
    backgroundColor: grey,
  },
};

interface IStyledTitle {
  color: string;
}
export const StyledTitle = styled.h4<IStyledTitle>(({ color }) => ({
  fontSize: "1em",
  marginLeft: 40,
  lineHeight: "20px",
  verticalAlign: "middle",
  color,
}));

interface IStyledControl {
  color: string;
}
export const StyledControlMinus = styled.button<IStyledControl>(
  ({ color }) => ({
    ...scoreGaugeControlStyle,

    "&:hover": {
      backgroundColor: color,
    },
  })
);
export const StyledControlPlus = styled.button<IStyledControl>(({ color }) => ({
  ...scoreGaugeControlStyle,
  ...controlPlusStyle,
  "&:hover": {
    backgroundColor: color,
  },
}));

// STEPS
export const scoreGaugeStepsStyle = {
  width: "100%",
  marginTop: 15,
  display: "flex",
  justifyContent: "space-between",
};

interface IStyledStep {
  color: string;
}
export const StyledStep = styled.li<IStyledStep>(({ color }) => ({
  height: 6,
  borderRadius: 6,
  backgroundColor: color,
  width: "calc(10% - 5px)",
  transition: "all .3s ease",
}));

// BADGES
export const ScoreGaugeBadgeContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginRight: 50,
  marginBottom: 25,
  marginTop: 10,
};
