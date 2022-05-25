import styled from "@emotion/styled";
import { mq } from "../../../assets/styles/mediaqueries";

export const adminSectionStyle = {
  width: "100%",
};
export const adminTitleStyle = {
  fontSize: 20,
  display: "flex",
  alignItems: "Center",
  justifyContent: "space-between",
  margin: 0,
  padding: 0,
  [mq[1]]: {
    fontSize: 25,
  },
  [mq[2]]: {
    fontSize: 30,
  },

  span: {
    marginLeft: 15,
  },
};
export const adminHeaderStyle = {
  display: "flex" as const,
  width: "100%",
  justifyContent: "space-between" as const,
  alignItems: "center" as const,
  paddingBottom: 25,

  "& > div": {
    width: "100%",
    flexBasis: "25%",
  },
};

interface IStyledSessionPopupContainer {
  isOpen: boolean;
}
export const StyledSessionPopupContainer = styled.div<IStyledSessionPopupContainer>(
  ({ isOpen }) => ({
    backgroundColor: "#00000050",
    position: "fixed" as const,
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,

    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",

    transition: "opacity .3s ease",

    "& > div": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  })
);
