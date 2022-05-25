import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../assets/styles/mediaqueries";
import { layoutMaxWidth } from "../../assets/styles/global";
import { brandColor, grey } from "../../assets/styles/colors";

export const headerAssessmentStyle = {
  width: "100%",
  display: "flex",
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 15,
  alignItems: "center",
  margin: "15px auto 0",
  maxWidth: layoutMaxWidth,
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
  flexDirection: "column" as const,
  borderBottom: `1px solid ${grey}`,

  [mq[1]]: {
    border: 0,
    marginTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 0,
    flexDirection: "row" as const,
  },

  [mq[2]]: {
    marginTop: 25,
    paddingLeft: 60,
    paddingRight: 60,
  },

  [mq[3]]: {
    marginTop: 30,
    paddingLeft: 80,
    paddingRight: 80,
  },
};

interface IStyledHeaderTitleTag {
  theme: Theme;
}

export const StyledHeaderTitleTag = styled.h2<IStyledHeaderTitleTag>(
  ({ theme: { colors } }) => ({
    fontWeight: 700,
    marginBottom: 15,
    paddingBottom: 15,

    "span > span": {
      color: colors ? colors.primary : brandColor,
    },
  })
);

export const headerAssessmentTitleStyle = {
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  justifyContent: "space-between",

  [mq[1]]: {
    marginRight: 20,
    flexDirection: "row" as const,
    borderBottom: `1px solid ${grey}`,
  },

  [mq[2]]: {
    marginRight: 25,
  },

  [mq[3]]: {
    marginRight: 30,
  },
};

export const headerAssessmentSubtitleStyle = {
  fontWeight: 700,
};

interface IStyledHeaderArea {
  theme: Theme;
}

export const StyledHeaderArea = styled.span<IStyledHeaderArea>(
  ({ theme: { colors } }) => ({
    display: "block",
    color: colors.primary,
  })
);

export const headerAssessmentKidneyStyle = {
  margin: 0,
  flex: "none",
  marginTop: -50,
  alignSelf: "flex-end",

  [mq[1]]: {
    marginTop: 0,
  },
};
