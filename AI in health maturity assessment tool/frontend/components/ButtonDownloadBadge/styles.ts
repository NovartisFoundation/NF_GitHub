import { mq } from "../../assets/styles/mediaqueries";
import { defaultTextColor } from "../../assets/styles/colors";

export const buttonDownloadBadgeStyles = {
  cursor: "pointer",
  marginTop: 15,
  display: "flex",
  paddingBottom: 5,
  marginBottom: 15,
  fontSize: "0.9em",
  alignSelf: "center",
  alignItems: "center",
  color: defaultTextColor,
  borderBottom: `1px solid ${defaultTextColor}`,

  [mq[2]]: {
    marginTop: 30,
    marginBottom: 30,
  },
};

export const buttonDownloadBadgeTextStyles = {
  paddingLeft: 5,

  [mq[2]]: {
    paddingLeft: 10,
  },
};
