import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../../assets/styles/mediaqueries";
import { grey, greyLight } from "../../../assets/styles/colors";

interface IStyledProgressPillars {
  theme: Theme;
  activePillar: number;
  totalPillars: number;
}

const progressBarStyles = {
  top: 0,
  left: 0,
  width: 5,
  zIndex: 0,
  bottom: 0,
  content: "''",
  height: "100%",
  borderRadius: 10,
  position: "absolute" as const,
};

export const StyledProgressPillars = styled.ul<IStyledProgressPillars>(
  ({ theme: { colors }, activePillar, totalPillars }) => {
    const pillarHeight = 100 / (totalPillars - 1);
    let progressPillarsHeight = pillarHeight * activePillar;
    if (activePillar + 1 !== totalPillars)
      progressPillarsHeight += pillarHeight / 2;

    return {
      display: "none",

      [mq[1]]: {
        margin: 0,
        width: 150,
        padding: 0,
        height: 300,
        minWidth: 150,
        maxWidth: 150,
        display: "flex",
        paddingRight: 15,
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
      },

      [mq[2]]: {
        width: 200,
        height: 350,
        minWidth: 200,
        maxWidth: 200,
        paddingRight: 30,
      },

      [mq[3]]: {
        width: 250,
        height: 400,
        minWidth: 250,
        maxWidth: 250,
        paddingRight: 60,
      },

      "&:before": {
        ...progressBarStyles,
        backgroundColor: greyLight,
      },

      "&:after": {
        ...progressBarStyles,
        backgroundColor: colors.primary,
        height: `${progressPillarsHeight}%`,
      },
    };
  }
);

interface IStyledProgressPillarsItem {
  theme: Theme;
  isDone: boolean;
  isActive: boolean;
}

export const StyledProgressPillarsItem = styled.li<IStyledProgressPillarsItem>(
  ({ theme: { colors }, isActive, isDone }) => {
    const cursorUrl = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="50"><circle cx="20" cy="20" r="15" stroke-width="1.5" shape-rendering="geometricPrecision" stroke="${colors.primary.replace(
      "#",
      "%23"
    )}" fill="transparent"/></svg>') 20 20, pointer;`;

    return {
      marginLeft: 0,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      pointerEvents: "none",
      cursor: !isActive && cursorUrl,

      "&:last-of-type": {
        "&:before": {
          alignSelf: "flex-end",
        },
      },

      "&:first-of-type": {
        "&:before": {
          alignSelf: "flex-start",
        },
      },

      "&:before": {
        zIndex: 5,
        flex: "none",
        content: "''",
        marginRight: 15,
        display: "block",
        borderRadius: "50%",
        position: "relative",
        pointerEvents: "auto",
        width: isActive ? 9 : isDone ? 7 : 5,
        height: isActive ? 9 : isDone ? 7 : 5,
        left: isActive ? -5 : isDone ? -2 : 0,
        boxShadow: isActive && `0 0 0 2px ${colors.primary}`,
        backgroundColor: isActive || isDone ? colors.primary : grey,
        border:
          (isActive && `3px solid white`) ||
          (isDone && `1px solid ${greyLight}`),
      },
    };
  }
);

interface IStyledProgressPillarsItemLabel {
  theme: Theme;
  isActive: boolean;
}

export const StyledProgressPillarsItemLabel = styled.span<IStyledProgressPillarsItemLabel>(
  ({ theme: { colors }, isActive }) => ({
    fontSize: "0.9em",
    overflow: "hidden",
    pointerEvents: "none",
    opacity: isActive ? 1 : 0,
    fontWeight: isActive && 700,
    transition: "all 0.5s ease",
    color: isActive ? colors.primary : grey,

    "li:hover &": {
      opacity: 1,
    },

    "li:last-of-type &": {
      marginBottom: -5,
    },

    "li:first-of-type &": {
      marginTop: -5,
    },
  })
);
