import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import { mq } from "../../../assets/styles/mediaqueries";
import { grey, greyDark, greyLight } from "../../../assets/styles/colors";

interface IStyledAnswerImage {
  isActive: boolean;
  totalAnswers: number;
}

export const StyledAnswerImage = styled.label<IStyledAnswerImage>(
  ({ isActive, totalAnswers }) => ({
    width: "100%",
    maxWidth: 400,
    display: "flex",
    borderRadius: 5,
    cursor: "pointer",
    position: "relative",
    alignItems: "center",
    margin: "0 0 45px",
    flexDirection: "column",
    transition: "all .3s ease",
    boxShadow: isActive && `0 0px 15px ${greyLight}`,
    border: isActive ? `1px solid ${greyDark}` : `1px solid ${grey}`,

    [mq[1]]: {
      width: totalAnswers === 2 ? "calc(50% - 30px)" : "calc(33.33% - 30px)",
    },

    [mq[2]]: {
      marginBottom: 60,
    },

    "&:hover": {
      boxShadow: `0 0px 15px ${greyLight}`,
    },
  })
);

export const answerImageTagStyles = {
  overflow: "hidden",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,

  img: {
    objectFit: "cover" as const,
  },
};

export const answerImageLabelStyles = {
  padding: 15,
  margin: "auto",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center" as const,
};

interface IStyledAnswerImageInput {
  theme: Theme;
  isActive: boolean;
}

export const StyledAnswerImageInput = styled.input<IStyledAnswerImageInput>(
  ({ theme: { colors }, isActive }) => ({
    width: 20,
    margin: 0,
    height: 20,
    bottom: -30,
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    borderRadius: "50%",
    position: "absolute",
    backgroundColor: "white",
    border: isActive ? `1px solid ${colors.primary}` : `1px solid ${grey}`,

    [mq[2]]: {
      bottom: -60,
    },

    "&:before": {
      width: 10,
      height: 10,
      top: "50%",
      left: "50%",
      content: `""`,
      borderRadius: "50%",
      display: "inline-block",
      transformOrigin: "center",
      position: "absolute" as const,
      backgroundColor: colors.primary,
      transition: "transform .3s ease-out",
      transform: isActive
        ? "translate(-50%, -50%) scale(1)"
        : "translate(-50%, -50%) scale(0)",
    },
  })
);
