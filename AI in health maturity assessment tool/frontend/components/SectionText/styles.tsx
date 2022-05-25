import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";

interface IStyledSectionText {
  size: number;
}

const StyledSectionText = styled.div<IStyledSectionText>(({ size }) => ({
  maxWidth: "100%",

  [mq[2]]: {
    maxWidth: `${size}%`,
  },
}));

export default StyledSectionText;
