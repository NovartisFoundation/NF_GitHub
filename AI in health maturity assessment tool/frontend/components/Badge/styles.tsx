import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { Size } from "../../utils/types";

const badgeSize = {
  [Size.Small]: [
    { width: 30, height: 30 },
    { width: 30, height: 30 },
    { width: 40, height: 40 },
    { width: 40, height: 40 },
  ],
  [Size.Medium]: [
    { width: 60, height: 60 },
    { width: 65, height: 65 },
    { width: 75, height: 75 },
    { width: 85, height: 85 },
  ],
  [Size.Large]: [
    { width: 125, height: 125 },
    { width: 150, height: 150 },
    { width: 175, height: 175 },
    { width: 200, height: 200 },
  ],
  [Size.XLarge]: [
    { width: 175, height: 175 },
    { width: 200, height: 200 },
    { width: 225, height: 225 },
    { width: 275, height: 275 },
  ],
};

interface IStyledBadge {
  size: Size;
  disabled: boolean;
}

const StyledBadge = styled.div<IStyledBadge>(({ size, disabled }) => ({
  display: "block",
  margin: "0 auto",
  position: "relative",
  width: badgeSize[size][0].width,
  height: badgeSize[size][0].height,
  opacity: disabled ? 0.3 : 1,

  [mq[1]]: {
    width: badgeSize[size][1].width,
    height: badgeSize[size][1].height,
  },

  [mq[2]]: {
    width: badgeSize[size][2].width,
    height: badgeSize[size][2].height,
  },

  [mq[3]]: {
    width: badgeSize[size][3].width,
    height: badgeSize[size][3].height,
  },
}));

export default StyledBadge;
