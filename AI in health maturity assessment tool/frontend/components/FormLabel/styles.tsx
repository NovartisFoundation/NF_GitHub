import { mq } from "../../assets/styles/mediaqueries";

export const formLabelStyles = {
  width: "100%",
  marginBottom: 10,
  position: "relative" as const,

  [mq[1]]: {
    marginBottom: 0,
    padding: "0 15px",
  },
};

export const formLabelTagStyles = {
  fontWeight: 400,
  display: "block",
  paddingBottom: 10,
};

export const formLabelIconStyles = {
  left: 10,
  zIndex: 5,
  bottom: 12,
  position: "absolute" as const,

  [mq[1]]: {
    left: 25,
  },

  "+ input[type='text'], + input[type='email'], + div": {
    paddingLeft: 40,
  },
};
