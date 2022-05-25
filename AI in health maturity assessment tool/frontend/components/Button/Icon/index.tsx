import Icon from "../../Icon";

import { Position } from "../../../utils/types";

import StyledButtonIcon from "./styles";

export interface IButtonIconProps {
  icon: string;
  color?: string;
  iconSide?: Position;
  isInverted: boolean;
}

const ButtonIcon = ({
  icon,
  color,
  iconSide,
  isInverted,
}: IButtonIconProps): React.ReactElement => (
  <StyledButtonIcon side={iconSide} isInverted={isInverted}>
    <Icon size={20} icon={icon} color={color} />
  </StyledButtonIcon>
);

export default ButtonIcon;
