import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../assets/styles/mediaqueries";
import {
  greyDark,
  brandColor,
  defaultTextColor,
} from "../../assets/styles/colors";

export const titleStyles = {
  paddingBottom: 15,
  position: "relative" as const,

  [mq[2]]: {
    paddingBottom: 30,
  },
};

const titleTagStyle = {
  marginBottom: 0,
};

interface IStyledTitle {
  theme: Theme;
  color?: string;
  isBold: boolean;
  hasBackground?: boolean;
}

export const StyledTitleTag = styled.h2<IStyledTitle>(
  ({ color = defaultTextColor, isBold, hasBackground, theme: { colors } }) => ({
    color,
    ...titleTagStyle,
    fontWeight: isBold ? 700 : 300,
    fontSize: hasBackground && 28,

    [mq[2]]: {
      paddingLeft: hasBackground && 250,
      paddingRight: hasBackground && 50,
    },

    "span > span": {
      transition: "all 0.5s ease",
      color: colors ? colors.primary : brandColor,
    },
  })
);

export const StyledSubtitleTag = styled.h3<IStyledTitle>(
  ({ color = defaultTextColor, isBold, theme: { colors } }) => ({
    color,
    ...titleTagStyle,
    fontWeight: isBold ? 700 : 300,

    "span > span": {
      transition: "all 0.5s ease",
      color: colors ? colors.primary : brandColor,
    },
  })
);

export const titleBackgroundStyles = {
  left: 0,
  top: "40%",
  zIndex: -1,
  width: 200,
  height: 120,
  opacity: 0.6,
  position: "absolute" as const,

  [mq[2]]: {
    top: 10,
    width: 400,
    height: 240,
  },
};

export const titleSubtitleStyles = {
  fontWeight: 400,
  marginBottom: 5,
  display: "block",
  fontSize: "0.6em",

  [mq[2]]: {
    marginBottom: 0,
    fontSize: "0.5em",
  },
};

export const titleTitleStyles = {
  display: "flex",
  alignItems: "center",
  flexDirection: "row" as const,

  svg: {
    marginRight: 15,
  },
};

export const titleDescriptionStyles = {
  color: greyDark,
  paddingTop: 15,
};

export const titleDescriptionHomeStyles = {
  color: greyDark,
  paddingTop: 15,
  fontStyle: "italic",
  fontSize: 12,
  [mq[2]]: {
    paddingLeft: 250,
    paddingRight: 50,
  },
};
