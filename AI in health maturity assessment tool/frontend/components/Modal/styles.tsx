import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../assets/styles/mediaqueries";
import { brandColor } from "../../assets/styles/colors";

export const modalStyles = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 20,
  position: "fixed" as const,
  overflowY: "scroll" as const,
  backgroundColor: "rgba(0,0,0,0.8)",
};

interface IStyledModalContent {
  isSmall: boolean;
}

export const StyledModalContent = styled.div<IStyledModalContent>(
  ({ isSmall }) => ({
    margin: 30,
    padding: 20,
    borderRadius: 5,
    display: "flex",
    maxWidth: "100%",
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    backgroundColor: "white",
    width: "calc(100% - 60px)",
    position: "relative" as const,
    flexDirection: "column" as const,

    [mq[1]]: {
      marginLeft: "auto",
      marginRight: "auto",
      padding: isSmall ? 15 : 30,
      maxWidth: isSmall ? 400 : 800,
    },

    [mq[2]]: {
      minHeight: !isSmall && 450,
      padding: isSmall ? 20 : 40,
      maxWidth: isSmall ? 500 : 900,
    },

    [mq[3]]: {
      padding: isSmall ? 30 : 60,
      maxWidth: isSmall ? 600 : 1100,
    },
  })
);

interface IStyledModalCloseButton {
  theme?: Theme;
}

export const StyledModalCloseButton = styled.button<IStyledModalCloseButton>(
  ({ theme: { colors } }) => ({
    top: 15,
    right: 15,
    cursor: "pointer",
    position: "absolute" as const,
    transition: "all .5s ease-in-out",

    "&:hover": {
      filter: "brightness(120%)",
    },

    path: {
      strokeWidth: 2,
      stroke: colors ? colors.primary : brandColor,
    },
  })
);
