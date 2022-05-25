/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import BackgroundDots from "../BackgroundDots";

import Icon from "../Icon";

import {
  titleStyles,
  StyledTitleTag,
  StyledSubtitleTag,
  titleBackgroundStyles,
  titleSubtitleStyles,
  titleTitleStyles,
  titleDescriptionStyles,
  titleDescriptionHomeStyles,
} from "./styles";

interface ITitleProps {
  title: string;
  icon?: string;
  color?: string;
  isBold?: boolean;
  subtitle?: string;
  description?: string;
  asSubtitle?: boolean;
  hasBackground?: boolean;
  isHomepage?: boolean;
}

const Title = ({
  icon,
  title,
  color,
  subtitle,
  description,
  isBold = false,
  asSubtitle = false,
  hasBackground = false,
  isHomepage = false,
}: ITitleProps): React.ReactElement => {
  const theme = useTheme();

  const innerTitle = () => (
    <>
      <span css={titleSubtitleStyles}>{subtitle}</span>
      <div css={titleTitleStyles}>
        {icon && <Icon icon={icon} color={color} />}
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    </>
  );

  return (
    <div css={titleStyles}>
      {asSubtitle ? (
        <StyledSubtitleTag color={color} theme={theme} isBold={isBold}>
          {innerTitle()}
        </StyledSubtitleTag>
      ) : (
        <StyledTitleTag
          color={color}
          theme={theme}
          isBold={isBold}
          hasBackground={hasBackground}
        >
          {hasBackground && (
            <div css={titleBackgroundStyles}>
              <BackgroundDots />
            </div>
          )}
          {innerTitle()}
        </StyledTitleTag>
      )}

      {description && (
        <p
          css={isHomepage ? titleDescriptionHomeStyles : titleDescriptionStyles}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
};

export default Title;
