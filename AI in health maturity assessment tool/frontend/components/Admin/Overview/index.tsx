/** @jsxImportSource @emotion/react */

import { useTranslation } from "next-i18next";
import Card from "../../Card";

import {
  areaDataTechnologyColor,
  areaPartnershipStakeholdersColor,
  areaPeopleWorkforceColor,
  green,
  grey,
  red,
} from "../../../assets/styles/colors";
import { getNumberWithOneDecimal } from "../../../config/admin";
import { AdminStatistics, Position } from "../../../utils/types";
import { adminSectionStyle } from "../Dashboard/styles";
import {
  adminOverviewBestWorstStyle,
  adminOverviewNumberPeopleStyle,
  adminOverviewStyle,
  adminOverviewTitleStyle,
  StyledAdminOverviewUncomplete,
  StyledAdminOverviewChart,
  StyledAdminOverviewComplete,
  StyledTopCountries,
} from "./styles";

interface IAdminOverviewProps {
  statistics: AdminStatistics;
  country: string;
  totalAverage: number;
}

const AdminOverview = ({
  statistics,
  country,
  totalAverage,
}: IAdminOverviewProps): React.ReactElement => {
  const { t } = useTranslation();

  const dataChart = {
    data: {
      labels: [
        t("admin:cards.typology.labels.ministries"),
        t("admin:cards.typology.labels.ingosCivilSocietyImplementers"),
        t("admin:cards.typology.labels.privateCompaniesStartups"),
        t("admin:cards.typology.labels.advocacyGroups"),
        t("admin:cards.typology.labels.healthOrganizations"),
      ],
      datasets: [
        {
          data: statistics.topology.map(({ count }) => count),
          backgroundColor: [
            green,
            areaDataTechnologyColor,
            areaPartnershipStakeholdersColor,
            areaPeopleWorkforceColor,
            red,
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
      responsive: true,
      legend: {
        display: false,
      },
      plugins: {
        tooltip: {
          backgroundColor: "rgba(1,1,1,1)",
        },
      },
      tooltips: {
        callbacks: {
          title(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
          label() {
            return "";
          },
          afterLabel(tooltipItem, data) {
            const dataset = data.datasets[0];
            const percent = Math.round(
              // eslint-disable-next-line no-underscore-dangle
              (dataset.data[tooltipItem.index] / dataset._meta[0].total) * 100
            );
            return `${percent}%`;
          },
        },
        backgroundColor: "#FFF",
        titleFontSize: 14,
        titleFontColor: "#000",
        bodyFontColor: grey,
        bodyFontSize: 14,
        displayColors: false,
        boxWidth: 100,
        tooltipCaretSize: 0,
      },
    },
  };

  return (
    <section css={{ ...adminSectionStyle, ...adminOverviewStyle }}>
      <p css={adminOverviewTitleStyle}>
        {t("admin:intro.start")}
        <span css={adminOverviewNumberPeopleStyle}>
          {statistics.total_participants}
        </span>
        {t("admin:intro.end")}
        {country.length > 0 ? t("admin:intro.country", { country }) : ""}.
      </p>
      <div css={{ gridColumn: "1/2", gridRow: "2/3" }}>
        <Card
          title={t("admin:cards.average.title")}
          number={getNumberWithOneDecimal(totalAverage).toString()}
          hasOnTen
        />
      </div>
      <div css={adminOverviewBestWorstStyle}>
        <Card
          title={t("admin:cards.bestScore.title")}
          color={green}
          hasOnTen
          number={getNumberWithOneDecimal(statistics.best).toString()}
          icon="thumbUp"
        />
        <Card
          title={t("admin:cards.worstScore.title")}
          color={red}
          hasOnTen
          number={getNumberWithOneDecimal(statistics.worst).toString()}
          icon="thumbDown"
        />
      </div>
      <StyledAdminOverviewComplete country={country}>
        <Card
          title={t("admin:cards.completedAssessemnts.title")}
          color={green}
          number={statistics.complete_assessment_pourcent.number.toString()}
          hint={`${getNumberWithOneDecimal(
            statistics.complete_assessment_pourcent.pourcent
          )}%`}
          hintPosition={Position.Bottom}
          description={t("admin:cards.completedAssessemnts.description")}
          icon="completed_assessment"
        />
      </StyledAdminOverviewComplete>
      <StyledAdminOverviewUncomplete country={country}>
        <Card
          title={t("admin:cards.uncompletedAssessemnts.title")}
          number={statistics.uncomplete_assessment_pourcent.number.toString()}
          hint={`${getNumberWithOneDecimal(
            statistics.uncomplete_assessment_pourcent.pourcent
          )}%`}
          hintPosition={Position.Bottom}
          color={red}
          description={t("admin:cards.uncompletedAssessemnts.description")}
          icon="uncompleted_assessment"
        />
      </StyledAdminOverviewUncomplete>
      <StyledTopCountries country={country}>
        <Card
          title={t("admin:cards.countries.title")}
          number={statistics.countries.total.toString()}
          numberColor="#000000"
          hint={t("admin:cards.countries.hint")}
          hintPosition={Position.Bottom}
          listTitle={t("admin:cards.countries.subtitle")}
          listData={statistics.countries.top}
        />
      </StyledTopCountries>
      <StyledAdminOverviewChart country={country}>
        <Card title={t("admin:cards.typology.title")} dataChart={dataChart} />
      </StyledAdminOverviewChart>
    </section>
  );
};

export default AdminOverview;
