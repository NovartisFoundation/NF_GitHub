import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { greyLight } from "../../assets/styles/colors";

interface IStyledBox {
  isSmall: boolean;
}

export const StyledBox = styled.div<IStyledBox>(({ isSmall }) => ({
  padding: 15,
  borderRadius: 5,
  backgroundColor: "white",
  position: "relative" as const,
  boxShadow: `0 0 40px ${greyLight}`,

  [mq[2]]: {
    padding: isSmall ? 15 : 30,
  },
}));

export default StyledBox;
