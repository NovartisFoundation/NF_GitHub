import { grey } from "../../../assets/styles/colors";
import { mq } from "../../../assets/styles/mediaqueries";

const defaultTextStyles = {
  top: "50%",
  left: "20%",
  color: grey,
  right: "50%",
  position: "absolute" as const,
  transform: "translate(0px, -50%)",

  [mq[2]]: {
    left: "15%",
  },
};

export default defaultTextStyles;
