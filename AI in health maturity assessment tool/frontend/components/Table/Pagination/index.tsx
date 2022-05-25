/** @jsxImportSource @emotion/react */
import FormSelect from "../../FormSelect";
import paginationStyle, {
  pageIndicatorStyle,
  pageSizeContainerStyle,
} from "./styles";

interface IPaginationProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  setPageSize: (pageSize: number) => void;
}

const Pagination = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  setPageSize,
}: IPaginationProps): React.ReactElement => (
  <div css={paginationStyle}>
    <div>
      <button
        type="button"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </button>{" "}
      <button
        type="button"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>{" "}
      <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </button>{" "}
      <button
        type="button"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </button>{" "}
    </div>
    <div css={pageSizeContainerStyle}>
      <p>Page size</p>
      <FormSelect
        isSearchable={false}
        id="pagination"
        onChange={(e) => {
          setPageSize(Number(e.value));
        }}
        options={[
          { label: "10", value: "10" },
          { label: "20", value: "20" },
          { label: "30", value: "30" },
          { label: "40", value: "40" },
          { label: "50", value: "50" },
        ]}
        placeholder="10"
        isSmall
      />
    </div>
    <div>
      <span css={pageIndicatorStyle}>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
    </div>
  </div>
);

export default Pagination;
