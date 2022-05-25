/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";

import StyledProgressAnswerImage from "./styles";

interface IProgressAnswerImageProps {
  size: number;
  maxSize: number;
}

const ProgressAnswerImage = ({
  size,
  maxSize,
}: IProgressAnswerImageProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <StyledProgressAnswerImage theme={theme} size={size} maxSize={maxSize} />
  );
};

export default ProgressAnswerImage;
