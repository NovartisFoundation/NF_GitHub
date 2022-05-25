import { mq } from "../../assets/styles/mediaqueries";

const areaSelectionStyles = {
  display: "flex",
  paddingTop: 15,
  flexDirection: "column" as const,

  [mq[1]]: {
    paddingTop: 30,
    alignItems: "flex-start",
    flexDirection: "row" as const,
  },

  [mq[2]]: {
    maxWidth: "80%",
    alignSelf: "center",
  },
};

export default areaSelectionStyles;
