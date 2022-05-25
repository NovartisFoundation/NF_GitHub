/** @jsxImportSource @emotion/react */
import { ThemeProvider } from "@emotion/react";
import { useTranslation } from "next-i18next";

import Badge from "./Badge";

import {
  badgesCollectionStyles,
  badgesCollectionLabelStyles,
  badgesCollectionListStyles,
  badgesCollectionItemStyles,
} from "./styles";

import { Area } from "../../utils/types";

import theme from "../../assets/styles/theme";

interface IBadgesCollectionProps {
  areasCompleted?: Area[];
}

const BadgesCollection = ({
  areasCompleted = [],
}: IBadgesCollectionProps): React.ReactElement => {
  const { t } = useTranslation();

  const badges = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    area: areasCompleted[index],
  }));

  return (
    <div css={badgesCollectionStyles}>
      <span css={badgesCollectionLabelStyles}>
        {t("badgesCollection.label")}
      </span>

      <ul css={badgesCollectionListStyles}>
        {badges.map(({ id, area }) => {
          if (area) {
            return (
              <ThemeProvider theme={theme[area]} key={id}>
                <Badge area={area} />
              </ThemeProvider>
            );
          }

          return <li css={badgesCollectionItemStyles} key={id} />;
        })}
      </ul>
    </div>
  );
};

export default BadgesCollection;
