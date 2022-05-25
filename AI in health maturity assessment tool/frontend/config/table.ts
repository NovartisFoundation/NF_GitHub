const tableColumns = (
  SelectColumnFilter: ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }: {
    column: {
      filterValue: unknown;
      setFilter: unknown;
      preFilteredRows: unknown;
      id: unknown;
    };
  }) => unknown,
  t: (keys, options?) => string
): {
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
}[] => [
  {
    Header: t("admin:table.headers.group"),
    accessor: "group",
    // Filter: SelectColumnFilter,
    // filter: "includes",
  },
  {
    Header: t("admin:table.headers.country"),
    accessor: "country",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: t("admin:table.headers.date"),
    accessor: "date",
  },
  {
    Header: t("admin:table.headers.P&W"),
    accessor: "results[0].score",
  },
  {
    Header: t("admin:table.headers.D&T"),
    accessor: "results[1].score",
  },
  {
    Header: t("admin:table.headers.G&R"),
    accessor: "results[2].score",
  },
  {
    Header: t("admin:table.headers.D&P"),
    accessor: "results[3].score",
  },
  {
    Header: t("admin:table.headers.P&S"),
    accessor: "results[4].score",
  },
  {
    Header: t("admin:table.headers.P&M"),
    accessor: "results[5].score",
  },
  {
    Header: t("admin:table.headers.total"),
    accessor: "total",
  },
];

export const csvExportName = "report-results-list.xls";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const csvExportNameHeader = (t: (keys, options?) => string) => [
  { label: "Stakeholder Group", key: "group" },
  { label: "Country", key: "country" },
  { label: "Date", key: "date" },
  { label: "Role", key: "role" },
  { label: "Is Finished", key: "isFinished" },
  { label: t("common:areas.peopleWorkforce"), key: "results[0].score" },
  { label: t("common:areas.dataTechnology"), key: "results[1].score" },
  { label: t("common:areas.governanceRegulatory"), key: "results[2].score" },
  { label: t("common:areas.designProcesses"), key: "results[3].score" },
  { label: t("common:areas.partnershipStakeholders"), key: "results[4].score" },
  { label: t("common:areas.businessModels"), key: "results[5].score" },
  { label: t("admin:table.headers.total"), key: "total" },
];

export default tableColumns;
