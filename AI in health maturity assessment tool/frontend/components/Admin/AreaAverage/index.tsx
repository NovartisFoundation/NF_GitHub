/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@emotion/react";

import Card from "../../Card";

import { adminSectionStyle } from "../Dashboard/styles";
import {
  adminAreaAverageContainerStyle,
  adminAreaAverageItemStyle,
  adminAreaAverageListStyle,
} from "./styles";

import { getNumberWithOneDecimal } from "../../../config/admin";

import { AdminStatistics } from "../../../utils/types";

import theme from "../../../assets/styles/theme";

interface IAdminAreaAverageProps {
  statistics: AdminStatistics;
}

const AdminAreaAverage = ({
  statistics,
}: IAdminAreaAverageProps): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <section css={{ ...adminSectionStyle, ...adminAreaAverageContainerStyle }}>
      <h2>{t("admin:averageArea.title")}</h2>

      <hr />
      <ul css={adminAreaAverageListStyle}>
        {statistics.area_average.map((area, index) => (
          <li
            css={adminAreaAverageItemStyle}
            key={`area-average-${index.toString()}`}
          >
            <ThemeProvider theme={theme[`${area.slug}`]}>
              <Card
                hasOnTen
                icon={area.slug}
                title={t(`common:areas.${area.slug}`)}
                number={getNumberWithOneDecimal(area.total).toString()}
              />
            </ThemeProvider>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AdminAreaAverage;
