/** @jsxImportSource @emotion/react */
import StyledForm from "./styles";

interface IFormProps {
  isSmall?: boolean;
  onSubmit?: () => void;
  children: React.ReactNode;
}

const Form = ({
  onSubmit,
  children,
  isSmall = false,
}: IFormProps): React.ReactElement => (
  <StyledForm isSmall={isSmall} onSubmit={onSubmit}>
    {children}
  </StyledForm>
);

export default Form;
