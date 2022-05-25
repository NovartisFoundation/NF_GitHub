/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { useTranslation } from "next-i18next";

import StyledBadgeLabel from "./styles";

import { Level } from "../../../utils/types";

interface IBadgeLabelProps {
  level: Level;
}

const BadgeLabel = ({ level }: IBadgeLabelProps): React.ReactElement => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <StyledBadgeLabel theme={theme}>
      {t(`badge.levels.${level}`)}
    </StyledBadgeLabel>
  );
};

export default BadgeLabel;
