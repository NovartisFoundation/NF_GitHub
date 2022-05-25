import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../../assets/styles/mediaqueries";
import { greyLight } from "../../../assets/styles/colors";

interface IStyledProgressAnswerImage {
  theme: Theme;
  size: number;
  maxSize: number;
}

const StyledProgressAnswerImage = styled.div<IStyledProgressAnswerImage>(
  ({ theme: { colors }, size, maxSize }) => ({
    display: "none",

    [mq[1]]: {
      left: 0,
      right: 0,
      height: 1,
      bottom: 25,
      margin: "0 auto",
      display: "block",
      position: "absolute",
      backgroundColor: greyLight,
      width: maxSize === 2 ? "51.5%" : "67.77%",
    },

    [mq[2]]: {
      bottom: 10,
    },

    "&:after": {
      top: 0,
      left: 0,
      content: "''",
      height: "100%",
      position: "absolute",
      transition: "width 0.5s ease",
      background:
        size === 2 || (size === 1 && maxSize === 2)
          ? colors.primary
          : `linear-gradient(to right, ${colors.primary} 75%, transparent)`,
      width:
        size === 0 && maxSize === 2
          ? "50%"
          : size === 0
          ? "25%"
          : size === 1 && maxSize === 2
          ? "100%"
          : size === 1
          ? "75%"
          : size === 2
          ? "100%"
          : "0%",
    },
  })
);

export default StyledProgressAnswerImage;
