import styled from "@emotion/styled";

import { brandColor } from "../../assets/styles/colors";

interface IStyledBackgroundDots {
  color?: string;
}

export const StyledBackgroundDots = styled.svg<IStyledBackgroundDots>(
  ({ color = brandColor }) => ({
    fill: color,
    maxWidth: "100%",
    maxHeight: "100%",
  })
);

export const backgroundDotsOpacity06Styles = {
  opacity: 0.6,
};

export const backgroundDotsOpacity03Styles = {
  opacity: 0.3,
};
