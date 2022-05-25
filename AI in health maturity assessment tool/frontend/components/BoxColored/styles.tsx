import styled from "@emotion/styled";

import { Theme } from "@emotion/react";

export const boxColoredStyles = {
  position: "relative" as const,
};

export const boxColoredBackgroundStyles = {
  left: -50,
  zIndex: 0,
  width: 300,
  height: 180,
  bottom: -100,
  display: "block",
  position: "absolute" as const,
};

interface IStyledBoxColoredTitle {
  theme: Theme;
}

export const StyledBoxColoredTitle = styled.div<IStyledBoxColoredTitle>(
  ({ theme: { colors } }) => ({
    color: colors.primary,
  })
);
