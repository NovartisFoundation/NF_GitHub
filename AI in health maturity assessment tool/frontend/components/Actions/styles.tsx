import { grey } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

const actionsStyles = {
  marginTop: 15,
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "column" as const,

  [mq[1]]: {
    alignItems: "center",
    flexDirection: "row" as const,
    justifyContent: "space-between",
  },

  "> div": {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "flex-end",
    flexDirection: "row" as const,

    form: {
      [mq[1]]: {
        marginTop: 0,
        maxWidth: 400,
        marginBottom: 0,

        "> div:last-of-type": {
          paddingBottom: 0,
        },
      },
    },

    [mq[1]]: {
      maxWidth: "45%",
    },

    "&:last-of-type": {
      p: {
        textAlign: "right" as const,
      },
    },

    "&:first-of-type:last-of-type": {
      marginLeft: "auto",
    },
  },

  p: {
    color: grey,
    width: "100%",
  },

  "button + p": {
    marginTop: 10,
  },

  "button + button": {
    marginLeft: 15,
  },
};

export default actionsStyles;
