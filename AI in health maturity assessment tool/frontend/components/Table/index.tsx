/** @jsxImportSource @emotion/react */
import { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import Pagination from "./Pagination";
import Header from "./Header";
import {
  headerStyle,
  selectStyle,
  separatorTableStyle,
  tableContainerStyle,
  tableStyle,
} from "./styles";
import Body from "./Body";
import { Session } from "../../utils/types";

interface ITableProps {
  columns: {
    Header: string;
    accessor: string;
    filter?: string;
    Filter?: ({
      column: { filterValue, setFilter, preFilteredRows, id },
    }: {
      column: {
        filterValue: unknown;
        setFilter: unknown;
        preFilteredRows: unknown;
        id: unknown;
      };
    }) => unknown;
  }[];
  data: Session[];
}

const Table = ({ columns, data }: ITableProps): React.ReactElement => {
  const filterTypes = useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: "",
    }),
    []
  );

  // Extended config of react-table at '/config/react-table-config.d.ts'
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  return (
    <>
      <header css={headerStyle}>
        {headerGroups.map((headerGroup) => (
          <div
            key={headerGroup.getHeaderGroupProps().key}
            role={headerGroup.getHeaderGroupProps().role}
            style={{ width: "25%" }}
          >
            {headerGroup.headers.map((column) => (
              <div
                key={column.getHeaderProps().key}
                role={column.getHeaderProps().role}
                style={{ width: "100%" }}
              >
                <div css={selectStyle}>
                  {column.canFilter ? column.render("Filter") : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </header>
      <div css={tableContainerStyle}>
        <table css={tableStyle} role={getTableProps().role}>
          <Header headerGroups={headerGroups} />
          <Body
            getTableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
          />
        </table>
        <div css={separatorTableStyle} />
      </div>
      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default Table;
