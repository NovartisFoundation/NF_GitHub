import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../../assets/styles/mediaqueries";
import { grey, greyLight } from "../../../assets/styles/colors";

interface IStyledAnswerEmoji {
  theme: Theme;
  isActive: boolean;
}

export const StyledAnswerEmoji = styled.label<IStyledAnswerEmoji>(
  ({ theme: { colors }, isActive }) => ({
    padding: 10,
    display: "flex",
    fontWeight: 400,
    marginBottom: 15,
    cursor: "pointer",
    alignItems: "center",
    transition: "all .3s ease",
    border: isActive ? `1px solid ${colors.primary}` : `1px solid ${grey}`,

    [mq[2]]: {
      padding: 15,
    },

    "&:hover": {
      boxShadow: `0 0px 15px ${greyLight}`,
    },

    "&:last-of-type": {
      marginBottom: 0,
    },
  })
);

interface IStyledAnswerEmojiVisual {
  theme: Theme;
  isActive: boolean;
  visual: string;
}

export const StyledEmojiVisual = styled.div<IStyledAnswerEmojiVisual>(
  ({ visual, theme: { colors }, isActive }) => ({
    width: 25,
    height: 25,
    marginRight: 25,
    borderRadius: "50%",
    transition: "all .3s ease",
    textShadow: "0 5px 5px #00000025",
    backgroundColor: isActive ? colors.primary : greyLight,

    position: "relative" as const,
    fontSize: "normal",
    fontWeight: "normal",
    flexShrink: 0,

    "&::before": {
      content: `"${visual}"`,
      position: "absolute",
      top: "calc(50% - 1px)",
      left: "50%",
      transform: "translate(-50%, -50%)",
      marginLeft: 2,
      marginBottom: 2,
    },

    [mq[1]]: {
      width: 30,
      height: 30,
    },

    [mq[2]]: {
      width: 35,
      height: 35,
    },

    [mq[3]]: {
      width: 40,
      height: 40,
    },
  })
);

export const answerEmojiInputStyles = {
  width: 0,
  height: 0,
  opacity: 0,
};
