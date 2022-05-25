import { greyLight } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const headerStyle = {
  display: "flex",
  justifyContent: "space-between" as const,
  alignItems: "center" as const,
  marginBottom: "8px",
  h2: {
    margin: 0,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold" as const,
    fontSize: "30px",
    lineHeight: "35px",
  },
};

export const tableStyle = {
  borderSpacing: 0,
  border: 0,
  width: "100%",

  tr: {
    "&:last-child": {
      td: {
        borderBottom: 0,
      },
    },
    "&:nth-of-type(even)": {
      background: "rgba(237, 240, 251, 0.3)",
    },
  },

  td: {
    padding: "32px 8px",
    fontSize: "14px",
    fontFamily: "Roboto",
  },

  "th, td": {
    margin: 0,
    borderBottom: "1px solid #d6d6d8",
    "&:last-child": {
      borderRight: 0,
    },
  },
};

export const tableContainerStyle = {
  position: "relative" as const,
};

export const separatorTableStyle = {
  position: "absolute" as const,
  top: 50,
  width: "calc(100% + 90px)",
  height: 2,
  backgroundColor: greyLight,
  margin: "0 -45px",
};

export const selectStyle = {
  position: "absolute" as const,
  top: 70,
  right: 20,
  width: "50%",

  [mq[1]]: {
    top: 0,
    right: 80,
    width: "20%",
  },
};
