import { footerBackgroundColor } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const footerStyle = {
  width: "100%",
  paddingTop: 15,
  paddingBottom: 15,
  backgroundColor: footerBackgroundColor,

  [mq[2]]: {
    paddingTop: 30,
    paddingBottom: 30,
  },
};

export const footerLogoStyle = {
  width: "100%",
  paddingTop: 15,
  display: "flex",

  [mq[1]]: {
    paddingTop: 0,
  },

  [mq[2]]: {
    justifyContent: "flex-end",
  },
};
