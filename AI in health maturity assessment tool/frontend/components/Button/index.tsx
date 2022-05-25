/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useTheme } from "@emotion/react";

import Spinner from "./Spinner";
import Icon, { IButtonIconProps } from "./Icon";

import { buttonStyles, StyledButton } from "./styles";

import { Position } from "../../utils/types";
import {
  defaultTextColor,
  greyMid,
  greyDark,
} from "../../assets/styles/colors";

interface IButtonProps extends Partial<IButtonIconProps> {
  title: string;
  link?: string;
  isSubmit?: boolean;
  isLoading?: boolean;
  isInverted?: boolean;
  isDisabled?: boolean;
  isSecondary?: boolean;
  onClick?: () => void;
}

function Button({
  title,
  link,
  icon,
  iconSide,
  onClick,
  isSubmit = false,
  isLoading = false,
  isDisabled = false,
  isInverted = false,
  isSecondary = false,
}: IButtonProps): React.ReactElement {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);

  let leftSideIcon;
  let rightSideIcon;

  if (icon) {
    const buttonIcon = (
      <Icon
        isInverted
        icon={icon}
        iconSide={iconSide}
        color={
          (isInverted && defaultTextColor) ||
          (isSecondary && isHover && greyDark) ||
          (isSecondary && greyMid)
        }
      />
    );

    if (iconSide === Position.Right) {
      rightSideIcon = buttonIcon;
    } else {
      leftSideIcon = buttonIcon;
    }
  }

  const innerButton = () => (
    <>
      {leftSideIcon} {title} {rightSideIcon}
    </>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer" css={buttonStyles}>
        {innerButton()}
      </a>
    );
  }

  return (
    <StyledButton
      theme={theme}
      onClick={onClick}
      disabled={isDisabled}
      isInverted={isInverted}
      isSecondary={isSecondary}
      type={isSubmit ? "submit" : "button"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isLoading ? <Spinner /> : innerButton()}
    </StyledButton>
  );
}

export default Button;
