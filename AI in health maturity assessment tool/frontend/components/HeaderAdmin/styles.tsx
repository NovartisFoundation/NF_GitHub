import { mq } from "../../assets/styles/mediaqueries";
import { layoutMaxWidth } from "../../assets/styles/global";

const headerAdminStyles = {
  width: "100%",
  display: "flex",
  paddingLeft: 20,
  paddingRight: 20,
  margin: "15px auto",
  maxWidth: layoutMaxWidth,
  flexDirection: "row" as const,
  justifyContent: "space-between",

  [mq[1]]: {
    marginTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: "center",
  },

  [mq[2]]: {
    marginTop: 25,
    paddingLeft: 60,
    paddingRight: 60,
    marginBottom: 30,
    flexWrap: "nowrap" as const,
  },

  [mq[3]]: {
    marginTop: 30,
    paddingLeft: 80,
    paddingRight: 80,
  },
};

export default headerAdminStyles;
