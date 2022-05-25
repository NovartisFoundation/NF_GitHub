/** @jsxImportSource @emotion/react */
import StyledList from "./styles";

interface IListProps {
  isOrdered?: boolean;
  children: React.ReactNode;
}

const List = ({ children, isOrdered }: IListProps): React.ReactElement => (
  <StyledList isOrdered={isOrdered}>{children}</StyledList>
);

export default List;
