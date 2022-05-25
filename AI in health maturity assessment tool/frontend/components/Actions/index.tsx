/** @jsxImportSource @emotion/react */
import actionsStyles from "./styles";

interface IActionsProps {
  children: React.ReactNode;
}

const Actions = ({ children }: IActionsProps): React.ReactElement => (
  <div css={actionsStyles}>{children}</div>
);

export default Actions;
