/** @jsxImportSource @emotion/react */
import StyledBox from "./styles";

interface IBoxProps {
  isSmall?: boolean;
  children: React.ReactNode;
}

const Box = ({ children, isSmall = false }: IBoxProps): React.ReactElement => (
  <StyledBox isSmall={isSmall}>{children}</StyledBox>
);

export default Box;
