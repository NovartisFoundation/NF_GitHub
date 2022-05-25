/* eslint-disable @typescript-eslint/ban-types */
/** @jsxImportSource @emotion/react */
import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";
import bodyStyle, { numberColumnStyle, StyledCell } from "./styles";

interface IBodyProps {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<object>
  ) => TableBodyProps;
  page: Row<object>[];
  prepareRow: (row: Row<object>) => void;
}

const Body = ({
  getTableBodyProps,
  page,
  prepareRow,
}: IBodyProps): React.ReactElement => (
  <tbody css={bodyStyle} role={getTableBodyProps().role}>
    {page.map((row, index) => {
      prepareRow(row);
      return (
        <tr key={row.getRowProps().key} role={row.getRowProps().role}>
          {/* Number row cell */}
          <td css={numberColumnStyle}>{index + 1}</td>
          {row.cells.map((cell) => (
            <StyledCell
              isBold={cell.column.Header === "Total"}
              key={cell.getCellProps().key}
              role={cell.getCellProps().role}
            >
              {cell.render("Cell")}
            </StyledCell>
          ))}
        </tr>
      );
    })}
  </tbody>
);

export default Body;
