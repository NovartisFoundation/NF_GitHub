import StyledContainer from "./styles";

interface IContainerProps {
  isSmall?: boolean;
  hasColumns?: boolean;
  children: React.ReactNode;
  isCentered?: boolean;
  isVerticallyCentered?: boolean;
}

const Container = ({
  children,
  isSmall = false,
  hasColumns = false,
  isCentered = false,
  isVerticallyCentered = false,
}: IContainerProps): React.ReactElement => (
  <StyledContainer
    isSmall={isSmall}
    hasColumns={hasColumns}
    isCentered={isCentered}
    isVerticallyCentered={isVerticallyCentered}
  >
    {children}
  </StyledContainer>
);

export default Container;
