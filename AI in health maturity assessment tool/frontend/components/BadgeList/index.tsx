/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import theme from "../../assets/styles/theme";
import { Area, Level, Size } from "../../utils/types";
import {
  badgeListStyle,
  badgeListItemStyle,
  badgeListTitleStyle,
  StyledText,
} from "./styles";

import Badge from "../Badge";
import ButtonDownloadBadge from "../ButtonDownloadBadge";
import levels from "../../config/levels";

interface IBadgeListProps {
  data: { area: Area; score: number; best?: number }[];
}

const BadgeList = ({ data }: IBadgeListProps): React.ReactElement => {
  const { t } = useTranslation();

  // Badges array
  const badgesArray = data.map(({ area, score }) => ({
    area: Area[area],
    level:
      score < levels[Level.emerging] / 10
        ? Level.exploring
        : score < levels[Level.leader] / 10
        ? Level.emerging
        : Level.leader,
  }));

  return (
    <div>
      <h3 css={badgeListTitleStyle}>{t("report:badges.title")}</h3>

      <ul css={badgeListStyle}>
        {badgesArray.map(({ area, level }, index) => (
          <li key={`badge-${index.toString()}`} css={badgeListItemStyle}>
            <Badge level={level} size={Size.Medium} area={Area[area]} />
            <StyledText color={theme[`${area}`].colors.primary}>
              {level === Level.leader
                ? t(`badge.levels.${Level.leader}`)
                : level === Level.emerging
                ? t(`badge.levels.${Level.emerging}`)
                : t(`badge.levels.${Level.exploring}`)}
            </StyledText>
          </li>
        ))}
      </ul>
      <ButtonDownloadBadge
        badges={badgesArray}
        label={t("report:badges.button")}
      />
    </div>
  );
};

export default BadgeList;
