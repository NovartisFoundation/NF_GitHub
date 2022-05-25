import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { layoutMaxWidth, layoutSmallWidth } from "../../assets/styles/global";

interface IStyledContainer {
  isSmall: boolean;
  hasColumns: boolean;
  isCentered: boolean;
  isVerticallyCentered: boolean;
}

const StyledContainer = styled.div<IStyledContainer>(
  ({ hasColumns, isSmall, isCentered, isVerticallyCentered }) => ({
    width: "100%",
    display: "flex",
    paddingLeft: 20,
    paddingRight: 20,
    margin: "0 auto",
    position: "relative",
    flexDirection: "column",
    alignItems: isCentered ? "center" : "flex-start",
    justifyContent: isVerticallyCentered && "center",
    maxWidth: isSmall ? layoutSmallWidth : layoutMaxWidth,

    [mq[1]]: {
      paddingLeft: 40,
      paddingRight: 40,
      alignItems: hasColumns && "center",
      flexDirection: hasColumns ? "row" : "column",
    },

    [mq[2]]: {
      paddingLeft: 60,
      paddingRight: 60,
    },

    [mq[3]]: {
      paddingLeft: 80,
      paddingRight: 80,
    },
  })
);

export default StyledContainer;
