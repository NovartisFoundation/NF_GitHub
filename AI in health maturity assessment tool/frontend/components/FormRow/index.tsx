/** @jsxImportSource @emotion/react */
import StyledFormRow from "./styles";

interface IFormRowProps {
  isError?: boolean;
  children: React.ReactNode;
}

const FormRow = ({
  children,
  isError = false,
}: IFormRowProps): React.ReactElement => (
  <StyledFormRow isError={isError}>{children}</StyledFormRow>
);

export default FormRow;
