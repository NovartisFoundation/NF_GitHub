/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";

import Icon from "../../Icon";

import StyledBadge from "./styles";

import { Area } from "../../../utils/types";

interface IBadgeProps {
  area: Area;
}

const Badge = ({ area }: IBadgeProps): React.ReactElement => {
  const theme = useTheme();
  const color = theme.colors.primary;

  return (
    <StyledBadge theme={theme}>
      <Icon icon={area} size={10} color={color} />
    </StyledBadge>
  );
};

export default Badge;
