/** @jsxImportSource @emotion/react */
import Link from "next/link";
import { CSVLink } from "react-csv";
import { useTranslation } from "next-i18next";

import Logo from "../Logo";
import Button from "../Button";

import headerAdminStyles from "./styles";

import { csvExportName, csvExportNameHeader } from "../../config/table";

import { Position, Session } from "../../utils/types";

interface IHeaderAdminProps {
  dataTable?: Session[];
}

const HeaderAdmin = ({ dataTable }: IHeaderAdminProps): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <header css={headerAdminStyles}>
      <Link href="/">
        <a>
          <Logo hasBaseline />
        </a>
      </Link>

      <CSVLink
        data={dataTable}
        filename={csvExportName}
        headers={csvExportNameHeader(t)}
      >
        <Button
          isInverted
          icon="download"
          iconSide={Position.Left}
          title={t("admin:downloadCSV")}
        />
      </CSVLink>
    </header>
  );
};

export default HeaderAdmin;
