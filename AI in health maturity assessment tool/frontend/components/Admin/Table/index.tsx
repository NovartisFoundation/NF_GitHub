/** @jsxImportSource @emotion/react */

import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

import Icon from "../../Icon";
import Table from "../../Table";
import PopUp from "../../PopUp";

import { greyLight } from "../../../assets/styles/colors";
import tableColumns, {
  csvExportName,
  csvExportNameHeader,
} from "../../../config/table";
import { Session } from "../../../utils/types";
import { adminSectionStyle } from "../Dashboard/styles";
import {
  adminTableContainerStyle,
  tableStyle,
  titleStyle,
  titleTagStyle,
} from "./styles";

interface IAdminTableProps {
  dataTable: Session[];
  isPopupOpen: boolean;
  handleClick: () => void;
  selectColumnFilter: ({
    column: { setFilter, preFilteredRows, id },
  }: {
    column: {
      setFilter: unknown;
      preFilteredRows: unknown;
      id: unknown;
    };
  }) => EmotionJSX.Element;
}

const AdminTable = ({
  dataTable,
  isPopupOpen,
  handleClick,
  selectColumnFilter,
}: IAdminTableProps): React.ReactElement => {
  const { t } = useTranslation();
  const columns = useMemo(() => tableColumns(selectColumnFilter, t), []);

  return (
    <section css={{ ...adminSectionStyle, ...adminTableContainerStyle }}>
      <div css={tableStyle}>
        <div css={titleStyle}>
          <h2 css={titleTagStyle}>
            <Icon icon="list" color={greyLight} />
            <strong>Result list</strong> (Quick view)
            <Icon icon="info" color="#000000" onClick={handleClick} />
          </h2>
          <PopUp
            isOpen={isPopupOpen}
            title="What does quick view means?"
            togglePopUp={handleClick}
            text={[
              "This list is a preview of the data base. Please download the .xls for the full details.",
            ]}
            top={0}
            left={450}
            color="#000000"
            hasDownloadButton
            downloadData={dataTable}
            downloadDataHeaders={csvExportNameHeader(t)}
            downloadFileName={csvExportName}
            downloadButtonTitle="Download detailed results in .xls"
          />
        </div>
        <Table columns={columns} data={dataTable} />
      </div>
    </section>
  );
};

export default AdminTable;
