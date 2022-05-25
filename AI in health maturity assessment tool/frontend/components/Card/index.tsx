/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { Doughnut } from "react-chartjs-2";
import {
  areaDataTechnologyColor,
  areaPartnershipStakeholdersColor,
  areaPeopleWorkforceColor,
  green,
  red,
} from "../../assets/styles/colors";
import { adminLanguage } from "../../config/admin";
import countryOptions from "../../config/countryOptions";
import { Position } from "../../utils/types";
import Icon from "../Icon";
import {
  cardHeaderStyle,
  StyledTitle,
  StyledCard,
  StyledNumber,
  cardChartLegendStyle,
  cardChartLegendItemStyle,
  cardChartLegendContainerStyle,
  cardListTitleStyle,
  cardListSeparatorStyle,
  cardListItemStyle,
  cardNumberContainerStyle,
  chartContentStyle,
  StyledContent,
  cardDescriptionStyle,
  cardOnTenStyle,
  StyledHint,
  cardListContainer,
} from "./styles";

const chartLegendColors = [
  green,
  areaDataTechnologyColor,
  areaPartnershipStakeholdersColor,
  areaPeopleWorkforceColor,
  red,
];

type ListData = {
  name: string;
  count: number;
};
type DataChart = {
  data: {
    labels: string[];
    datasets: Record<string, unknown>[];
  };
  options: Record<string, unknown>;
};

interface ICardProps {
  title: string;
  icon?: string;
  hint?: string;
  hintPosition?: Position;
  number?: string;
  numberColor?: string;
  description?: string;
  color?: string;
  dataChart?: DataChart;
  listTitle?: string;
  listData?: ListData[];
  hasOnTen?: boolean;
}

const Card = ({
  title,
  icon,
  hint,
  hintPosition = Position.Top,
  number,
  numberColor,
  description,
  color = "#ffffff",
  dataChart,
  listTitle,
  listData,
  hasOnTen = false,
}: ICardProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <StyledCard color={color}>
      <div css={cardHeaderStyle}>
        <StyledTitle theme={theme}>{title}</StyledTitle>
        {icon && <Icon icon={icon} color={theme?.colors?.primary} />}
      </div>
      <StyledContent hasDescription={!!description}>
        <div css={cardNumberContainerStyle}>
          {hint && hintPosition === Position.Top && (
            <StyledHint theme={theme} backgroundColor={color}>
              {hint}
            </StyledHint>
          )}
          {number && (
            <StyledNumber
              numberColor={numberColor}
              theme={theme}
              backgroundColor={color}
            >
              {number}
              {hasOnTen && <small css={cardOnTenStyle}>/10</small>}
            </StyledNumber>
          )}
          {hint && hintPosition === Position.Bottom && (
            <StyledHint theme={theme} backgroundColor={color}>
              {hint}
            </StyledHint>
          )}
        </div>

        {description && <p css={cardDescriptionStyle}>{description}</p>}

        {dataChart && (
          <div css={chartContentStyle}>
            <Doughnut
              data={dataChart.data}
              width={200}
              height={125}
              options={dataChart.options}
            />

            <ul css={cardChartLegendContainerStyle}>
              {dataChart.data.labels.map((label, index) => (
                <li
                  css={cardChartLegendItemStyle}
                  key={`label-${index.toString()}`}
                >
                  <div
                    css={{
                      ...cardChartLegendStyle,
                      backgroundColor: chartLegendColors[index],
                    }}
                  />
                  <p>{label}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {listTitle && listData && (
          <div css={cardListContainer}>
            <div css={cardListSeparatorStyle} />
            <h2 css={cardListTitleStyle}>{listTitle}</h2>
            <ul>
              {listData.map((item, index) => (
                <li css={cardListItemStyle} key={`item-${index.toString()}`}>
                  <h3>
                    {
                      countryOptions[adminLanguage].find(
                        (country) => country.value === item.name
                      ).label
                    }
                  </h3>
                  <p>{item.count}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </StyledContent>
    </StyledCard>
  );
};

export default Card;
