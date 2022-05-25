import styled from "@emotion/styled";

import { mq } from "../../../assets/styles/mediaqueries";

import { Position } from "../../../utils/types";

interface IStyledButtonIcon {
  side?: Position;
  isInverted: boolean;
}

const StyledButtonIcon = styled.span<IStyledButtonIcon>(
  ({ side = Position.Right, isInverted }) => ({
    paddingLeft: side === Position.Right && 10,
    paddingRight: side === Position.Left && 10,

    [mq[1]]: {
      marginLeft: side === Position.Left && !isInverted && -10,
      marginRight: side === Position.Right && !isInverted && -10,
    },
  })
);

export default StyledButtonIcon;
