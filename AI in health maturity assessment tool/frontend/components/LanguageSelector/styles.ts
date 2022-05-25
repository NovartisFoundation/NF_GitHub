import styled from "@emotion/styled";

import { brandColor, defaultTextColor } from "../../assets/styles/colors";

interface IStyledLanguageSelector {
  isInversed: boolean;
}

export const StyledLanguageSelector = styled.div<IStyledLanguageSelector>(
  ({ isInversed }) => ({
    zIndex: 5,
    display: "flex",
    position: "relative",
    textTransform: "uppercase",
    alignItems: isInversed ? "flex-start" : "flex-end",
    flexDirection: isInversed ? "column-reverse" : "column",
  })
);

export const languageSelectorButtonStyles = {
  padding: 0,
  display: "flex",
  letterSpacing: 1,
  fontWeight: 700,
  fontSize: "0.8em",
  cursor: "pointer",
  alignItems: "center",
  textTransform: "uppercase" as const,
};

interface IStyledLanguageSelectorIcon {
  isOpen: boolean;
}

export const StyledLanguageSelectorIcon = styled.span<IStyledLanguageSelectorIcon>(
  ({ isOpen }) => ({
    marginLeft: 5,
    transition: "transform 0.3s ease",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  })
);

interface IStyledLanguageSelectorList {
  isOpen: boolean;
  isInversed: boolean;
}

export const StyledLanguageSelectorList = styled.ul<IStyledLanguageSelectorList>(
  ({ isOpen, isInversed }) => ({
    letterSpacing: 1,
    paddingRight: 25,
    paddingBottom: 0,
    fontSize: "0.7em",
    position: "absolute",
    opacity: isOpen ? 1 : 0,
    backgroundColor: "white",
    transition: "all 0.5s ease",
    bottom: isInversed && "100%",
  })
);

export const languageSelectorListItemStyles = {
  margin: 0,
  padding: 0,
  paddingTop: 5,
  paddingBottom: 5,
  textAlign: "left" as const,
  position: "relative" as const,
};

interface IStyledLanguageSelectorListItemLink {
  isDisabled: boolean;
}

export const StyledLanguageSelectorListItemLink = styled.a<IStyledLanguageSelectorListItemLink>(
  ({ isDisabled }) => ({
    transition: "all 0.5s ease",
    cursor: isDisabled ? "default" : "pointer",
    color: isDisabled ? brandColor : defaultTextColor,

    "&:hover": {
      color: brandColor,
    },
  })
);
