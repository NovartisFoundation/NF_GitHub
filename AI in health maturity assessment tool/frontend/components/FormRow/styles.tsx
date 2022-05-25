import styled from "@emotion/styled";
import { red } from "../../assets/styles/colors";

import { mq } from "../../assets/styles/mediaqueries";

interface IStyledFormRow {
  isError: boolean;
}

const StyledFormRow = styled.div<IStyledFormRow>(({ isError }) => ({
  display: "flex",
  alignItems: "flex-end",
  color: isError && red,
  flexWrap: "wrap" as const,
  justifyContent: "flex-end",
  fontWeight: isError && 400,
  flexDirection: "row" as const,
  fontStyle: isError && "italic",

  [mq[1]]: {
    margin: "0 -15px",
    paddingBottom: 15,
    flexWrap: "nowrap" as const,
  },

  "button, p": {
    [mq[1]]: {
      margin: "0 15px",
    },
  },
}));

export default StyledFormRow;
