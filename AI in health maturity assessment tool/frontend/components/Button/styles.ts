import styled from "@emotion/styled";
import { Theme } from "@emotion/react";
import { mq } from "../../assets/styles/mediaqueries";
import {
  grey,
  greyDark,
  greyLight,
  brandColor,
  defaultTextColor,
} from "../../assets/styles/colors";

export const buttonStyles = {
  padding: 10,
  minWidth: 100,
  border: "none",
  color: "white",
  borderRadius: 5,
  outline: "none",
  fontWeight: 500,
  cursor: "pointer",
  width: "fit-content",
  alignItems: "center",
  textDecoration: "none",
  display: "inline-flex",
  justifyContent: "center",
  backgroundColor: brandColor,
  transition: "all .5s ease-in-out",

  [mq[1]]: {
    padding: 15,
    minWidth: 120,
  },

  [mq[2]]: {
    minWidth: 130,
    paddingLeft: 20,
    paddingRight: 20,
  },

  [mq[3]]: {
    minWidth: 150,
    paddingLeft: 30,
    paddingRight: 30,
  },

  "&:hover:not(:disabled)": {
    color: "white",
    filter: "brightness(120%)",
  },

  "&:disabled": {
    color: grey,
    transition: "none",
    cursor: "not-allowed",
    backgroundColor: greyLight,
  },
};

interface IStyledButton {
  theme: Theme;
  isInverted: boolean;
  isSecondary: boolean;
}

export const StyledButton = styled.button<IStyledButton>(
  ({ isInverted, isSecondary, theme: { colors } }) => ({
    ...buttonStyles,
    minWidth: isSecondary ? "auto" : 100,
    paddingLeft: isSecondary ? 0 : 10,
    paddingRight: isSecondary ? 0 : 10,
    color: isInverted ? defaultTextColor : isSecondary ? grey : "white",
    border: isInverted && `2px solid ${defaultTextColor}`,
    backgroundColor: isInverted
      ? "transparent"
      : isSecondary
      ? "transparent"
      : colors
      ? colors.primary
      : brandColor,

    [mq[1]]: {
      padding: 15,
      minWidth: isSecondary ? "auto" : 120,
      paddingLeft: isSecondary ? 0 : 15,
      paddingRight: isSecondary ? 0 : 15,
    },

    [mq[2]]: {
      minWidth: isSecondary ? "auto" : 130,
      paddingLeft: isSecondary ? 0 : 20,
      paddingRight: isSecondary ? 0 : 20,
    },

    [mq[3]]: {
      minWidth: isSecondary ? "auto" : 150,
      paddingLeft: isSecondary ? 0 : 30,
      paddingRight: isSecondary ? 0 : 30,
    },

    "&:hover:not(:disabled)": {
      filter: !isSecondary && "brightness(120%)",
      color: isInverted ? defaultTextColor : isSecondary ? greyDark : "white",
    },
  })
);
