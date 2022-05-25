import { grey, greyDark, greyLight } from "../../../assets/styles/colors";
import { mq } from "../../../assets/styles/mediaqueries";

const paginationStyle = {
  marginTop: 25,
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center" as const,

  [mq[1]]: {
    display: "flex" as const,
    div: {
      "&:first-of-type": { flexBasis: "33%" },
      "&:last-of-type": { flexBasis: "33%" },
    },
  },

  div: {
    "&:first-of-type": {
      fontSize: 25,

      button: {
        color: grey,
        cursor: "pointer",
        transition: "color .3s ease",

        "&:hover": {
          color: greyDark,
        },
        "&:disabled": {
          color: greyLight,
          cursor: "not-allowed",
        },
      },
    },

    "&:last-of-type": {
      color: greyDark,
      textAlign: "right" as const,

      "& > div": {
        fontSize: "15px !important",
      },
    },
  },
};

export const pageIndicatorStyle = {
  marginBottom: 5,
  display: "inline-block",
};
export const pageSizeContainerStyle = {
  display: "flex",
  justifyContent: "center" as const,
  alignItems: "center" as const,
  marginBottom: 20,
  marginTop: 20,

  [mq[1]]: {
    marginBottom: 0,
    marginTop: 0,
    flexBasis: "33%",
  },

  p: {
    margin: "0 20px 0 0",
  },
  div: {
    flexBasis: "20% !important",

    [mq[1]]: {
      flexBasis: "40% !important",
    },

    [mq[2]]: {
      flexBasis: "30% !important",
    },

    [mq[3]]: {
      flexBasis: "20% !important",
    },
  },
};

export default paginationStyle;
