/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import { HeaderGroup } from "react-table";
import { greyDark } from "../../../assets/styles/colors";
import Icon from "../../Icon";
import headerStyle from "./styles";

interface IHeaderProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  headerGroups: HeaderGroup<object>[];
}

const Header = ({ headerGroups }: IHeaderProps): React.ReactElement => (
  <thead css={headerStyle}>
    {headerGroups.map((headerGroup) => (
      <tr
        key={headerGroup.getHeaderGroupProps().key}
        role={headerGroup.getHeaderGroupProps().role}
      >
        {/* Number row column */}
        <th> </th>
        {headerGroup.headers.map((column) => (
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render("Header")}
            <Icon
              icon={
                column.isSorted
                  ? column.isSortedDesc
                    ? "arrow_downward"
                    : "arrow_upward"
                  : ""
              }
              color={greyDark}
            />
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default Header;
