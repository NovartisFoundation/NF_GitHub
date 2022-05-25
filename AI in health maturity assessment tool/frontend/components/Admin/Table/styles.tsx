import { mq } from "../../../assets/styles/mediaqueries";

export const adminTableContainerStyle = {
  overflowX: "scroll" as const,
  marginTop: 50,
  "& > h2:first-of-type": {
    fontSize: "1.3333333333em",
    fontWeight: 900,
    marginBottom: 13,
  },

  [mq[1]]: {
    overflowX: "visible" as const,
  },
};
export const tableStyle = {
  padding: "1rem",
  width: "100%",
};

export const titleStyle = {
  position: "relative" as const,
};

export const titleTagStyle = {
  display: "flex",
  alignItems: "center" as const,

  svg: {
    "&:first-of-type": {
      marginRight: 15,
    },
    "&:last-of-type": {
      marginLeft: 10,
      cursor: "pointer",
    },
  },
  strong: {
    marginRight: 5,
  },
};
