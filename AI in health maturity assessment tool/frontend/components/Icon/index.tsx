/** @jsxImportSource @emotion/react */
import iconPath from "../../assets/icons/icons";

import { iconStyle, StyledIconPath } from "./styles";

interface IIconProps {
  icon: string;
  size?: number;
  color?: string;
  viewBox?: string;
  onClick?: () => void;
}

const Icon = ({
  icon,
  color,
  size = 24,
  viewBox = "0 0 24 24",
  onClick,
}: IIconProps): React.ReactElement => (
  <svg
    css={iconStyle}
    viewBox={viewBox}
    width={`${size}px`}
    height={`${size}px`}
    onClick={onClick}
  >
    <StyledIconPath fill={color} d={iconPath[icon]} />
  </svg>
);

export default Icon;
