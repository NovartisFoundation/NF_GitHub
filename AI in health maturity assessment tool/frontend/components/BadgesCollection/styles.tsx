import { grey } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const badgesCollectionStyles = {
  marginTop: 15,
  display: "flex",
  flexDirection: "column" as const,

  [mq[1]]: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row" as const,
  },
};

export const badgesCollectionLabelStyles = {
  color: grey,
  fontSize: "0.9em",
  whiteSpace: "nowrap" as const,
};

export const badgesCollectionListStyles = {
  marginTop: 5,
  width: "100%",
  display: "flex",
  marginBottom: 0,
  paddingBottom: 0,
  flexDirection: "row" as const,

  [mq[1]]: {
    marginTop: 0,
    paddingLeft: 15,
  },
};

export const badgesCollectionItemStyles = {
  margin: 2,
  width: 20,
  height: 20,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${grey}`,
};
