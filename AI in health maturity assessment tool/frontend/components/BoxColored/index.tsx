/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";

import {
  boxColoredStyles,
  boxColoredBackgroundStyles,
  StyledBoxColoredTitle,
} from "./styles";

import Box from "../Box";
import BackgroundDots from "../BackgroundDots";

interface IBoxColoredProps {
  title: string;
  children: React.ReactNode;
}

const BoxColored = ({
  title,
  children,
}: IBoxColoredProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <div css={boxColoredStyles}>
      <div css={boxColoredBackgroundStyles}>
        <BackgroundDots color={theme.colors.primary} />
      </div>
      <Box>
        <StyledBoxColoredTitle theme={theme}>
          <strong>{title}</strong>
        </StyledBoxColoredTitle>
        {children}
      </Box>
    </div>
  );
};

export default BoxColored;
