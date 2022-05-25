import { mq } from "../../assets/styles/mediaqueries";
import { brandColor } from "../../assets/styles/colors";

const scrollTopStyle = {
  right: 15,
  border: 0,
  padding: 5,
  bottom: 15,
  zIndex: 10,
  borderRadius: 2,
  cursor: "pointer",
  position: "fixed" as const,
  backgroundColor: brandColor,

  [mq[1]]: {
    right: 20,
    bottom: 20,
  },

  [mq[2]]: {
    right: 25,
    bottom: 25,
  },

  [mq[3]]: {
    right: 30,
    bottom: 30,
  },
};

export default scrollTopStyle;
