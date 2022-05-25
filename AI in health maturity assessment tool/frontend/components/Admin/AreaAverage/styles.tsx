import { mq } from "../../../assets/styles/mediaqueries";

export const adminAreaAverageContainerStyle = {
  marginTop: 50,
  "& > h2:first-of-type": {
    fontSize: "1.3333333333em",
    fontWeight: 900,
    marginBottom: 13,
  },
};

export const adminAreaAverageListStyle = {
  marginTop: 27,
  display: "flex",
  justifyContent: "space-between" as const,
  flexFlow: "wrap",
};

export const adminAreaAverageItemStyle = {
  marginBottom: 48,
  flexBasis: "100%",

  [mq[1]]: {
    flexBasis: "30%",
  },
};
