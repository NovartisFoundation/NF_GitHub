import styled from "@emotion/styled";
import { brandColor } from "../../assets/styles/colors";

interface IStyledPopup {
  isOpen: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  color?: string;
}

export const StyledPopup = styled.div<IStyledPopup>(
  ({
    top = "auto",
    left = "auto",
    right = "auto",
    bottom = "auto",
    color,
    isOpen,
  }) => ({
    top,
    left,
    right,
    bottom,
    color,
    zIndex: 5,
    width: "100%",
    maxWidth: 350,
    opacity: isOpen ? 1 : 0,
    backgroundColor: "#ffffff",
    height: isOpen ? "auto" : 0,
    position: "absolute" as const,
    transition: "opacity .3s ease-out",
    transform: isOpen ? "scaleY(1)" : "scale(0)",

    p: {
      fontSize: "0.8em",

      "&:last-of-type": {
        marginBottom: 0,
      },
    },
  })
);

export const PopupTitleStyles = {
  display: "block",
  paddingBottom: 10,
};

export const PopupCloseButtonStyles = {
  top: 10,
  right: 5,
  cursor: "pointer",
  position: "absolute" as const,
};

export const downloadButtonStyle = {
  marginTop: 25,
  cursor: "pointer",
  padding: "0 0 5px",
  borderBottom: "1px solid #000000",
};
