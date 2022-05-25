/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { Radar } from "react-chartjs-2";
import { brandColor, green, grey, greyLight } from "../../assets/styles/colors";
import theme from "../../assets/styles/theme";
import { Area } from "../../utils/types";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import {
  scoreChartContainerStyle,
  scoreChartHintStyle,
  scoreChartLabelsContainerStyle,
  StyledLabel,
} from "./styles";

interface IScoreChartProps {
  scoreData: { area: Area; score: number; best?: number }[];
  scoreDynamic: { area: Area; score: number; best?: number }[];
  isDynamicVisible?: boolean;
}

const ScoreChart = ({
  scoreData,
  scoreDynamic,
  isDynamicVisible = false,
}: IScoreChartProps): React.ReactElement => {
  const { t } = useTranslation();

  // Chart
  const chartRef = useRef<Radar>();

  const scoreInitial = scoreData.map((s) => s.score);

  const dataChart = {
    data: {
      labels: ["", "", "", "", "", ""],
      datasets: [
        {
          label: t("report:chart.label"),
          data: scoreInitial,
          backgroundColor: `${brandColor}50`,
          borderColor: brandColor,
        },
        {
          label: "Best",
          data: scoreDynamic.map((s) => s.score),
          backgroundColor: isDynamicVisible ? `${green}50` : "transparent",
          borderColor: isDynamicVisible ? green : "transparent",
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
      scale: {
        reverse: false,
        gridLines: {
          color: [
            greyLight,
            greyLight,
            greyLight,
            greyLight,
            greyLight,
            greyLight,
            greyLight,
            grey,
            greyLight,
            greyLight,
          ],
          lineWidth: [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
        },
        pointLabels: {
          fontSize: 0,
        },
        ticks: {
          beginAtZero: true,
          max: 10,
          display: false,
        },
      },
    },
  };

  return (
    <div css={scoreChartContainerStyle}>
      <Radar
        data={dataChart.data}
        width={400}
        height={420}
        options={dataChart.options}
        ref={chartRef}
      />

      <div css={scoreChartLabelsContainerStyle}>
        {dataChart.data.labels.map((l, index) => (
          <StyledLabel
            color={theme[`${scoreData[index].area}`].colors.primary}
            index={index}
            key={`label-chart-${index.toString()}`}
          >
            <Icon
              icon={scoreData[index].area}
              color={theme[`${scoreData[index].area}`].colors.primary}
              size={24}
            />
            <Tooltip id={`tooltip-${index}`}>
              <p style={{ fontWeight: 900, marginBottom: 10 }}>
                {t(`areas.${scoreData[index].area}`)}
              </p>
              <p>
                {t("report:chart.score")}: {scoreInitial[index]}
              </p>
            </Tooltip>
          </StyledLabel>
        ))}
      </div>

      <p css={scoreChartHintStyle}>{t("report:chart.ideal")}</p>
    </div>
  );
};

export default ScoreChart;
