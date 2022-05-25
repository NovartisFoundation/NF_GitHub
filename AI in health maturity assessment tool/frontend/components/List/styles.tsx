import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { defaultTextColor, grey } from "../../assets/styles/colors";

interface IStyledList {
  isOrdered: boolean;
}

const StyledList = styled.ul<IStyledList>(({ isOrdered }) => ({
  paddingBottom: 0,

  li: {
    marginLeft: 0,
    paddingLeft: 15,
    marginBottom: 10,
    position: "relative",
    counterIncrement: "list-counter",

    [mq[2]]: {
      paddingLeft: 20,
    },

    "&:last-of-type": {
      marginBottom: 0,
    },

    "&::before": {
      left: 0,
      fontWeight: "bold",
      position: "absolute",
      color: isOrdered ? defaultTextColor : grey,
      content: isOrdered ? "counter(list-counter)'/'" : "'•'",
    },

    li: {
      paddingLeft: 0,
      marginLeft: 15,
      listStyle: "disc",
      counterIncrement: "none",

      "&::before": {
        content: "none",
      },
    },
  },
}));

export default StyledList;
