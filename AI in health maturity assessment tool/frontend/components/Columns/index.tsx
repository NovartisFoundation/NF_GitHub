/** @jsxImportSource @emotion/react */

import StyledColumns from "./styles";

interface IColumnsProps {
  columns: number[];
  children: React.ReactNode;
}

const Columns = ({ children, columns }: IColumnsProps): React.ReactElement => (
  <StyledColumns columns={columns}>{children}</StyledColumns>
);

export default Columns;
