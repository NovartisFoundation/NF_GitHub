import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { greyLight } from "../../assets/styles/colors";

interface IStyledKidney {
  isSmall: boolean;
}

export const StyledKidney = styled.div<IStyledKidney>(({ isSmall }) => ({
  flex: 1,
  margin: "0 auto",
  display: "block",
  position: "relative",
  width: isSmall ? 80 : 250,
  height: isSmall ? 65 : 210,
  pointerEvents: isSmall ? "none" : "auto",

  [mq[1]]: {
    width: isSmall ? 100 : 375,
    height: isSmall ? 85 : 320,
    paddingRight: !isSmall && 15,
  },

  [mq[2]]: {
    width: isSmall && 120,
    height: isSmall && 100,
    paddingRight: !isSmall && 20,
  },

  [mq[3]]: {
    paddingRight: !isSmall && 30,
  },
}));

export const kidneySvgStyles = {
  maxWidth: "100%",
  maxHeight: "100%",
};

interface IStyledKidneyAreaPath {
  color: string;
  isActive: boolean;
  isSelected: boolean;
}

export const StyledKidneyAreaPath = styled.path<IStyledKidneyAreaPath>(
  ({ isSelected, color, isActive }) => ({
    transition: "all 0.5s ease",
    pointerEvents: isActive ? "none" : "inherit",
    fill: isSelected || isActive ? color : greyLight,
    cursor: isSelected ? "default" : isActive ? "default" : "pointer",

    "&:hover": {
      fill: color,
    },
  })
);

export const kidneyAreaIconPathStyles = {
  fill: "white",
  pointerEvents: "none" as const,
};
