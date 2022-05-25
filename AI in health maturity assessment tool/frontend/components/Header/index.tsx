/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "next-i18next";

import Button from "../Button";
import Kidney from "../Kidney";

import {
  headerAssessmentStyle,
  headerAssessmentTitleStyle,
  StyledHeaderTitleTag,
  headerAssessmentSubtitleStyle,
  StyledHeaderArea,
  headerAssessmentKidneyStyle,
} from "./styles";

import { Area, AreaTypes, Position } from "../../utils/types";

interface IHeaderProps {
  title?: string;
  activeArea?: AreaTypes;
  areasCompleted?: Area[];
  toggleModalShare?: () => void;
  isActiveAreaCompleted?: boolean;
}

const Header = ({
  title,
  activeArea,
  areasCompleted,
  toggleModalShare,
  isActiveAreaCompleted,
}: IHeaderProps): React.ReactElement => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isNewActiveArea, setIsNewActiveArea] = useState(false);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevActiveArea = usePrevious(activeArea);

  useEffect(() => {
    if (
      isActiveAreaCompleted &&
      prevActiveArea === "default" &&
      prevActiveArea !== activeArea
    ) {
      setIsNewActiveArea(true);
    }
  }, [activeArea]);

  return (
    <header css={headerAssessmentStyle}>
      {title && (
        <div css={headerAssessmentTitleStyle}>
          <StyledHeaderTitleTag theme={theme}>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </StyledHeaderTitleTag>

          {activeArea && activeArea !== "default" && (
            <div css={headerAssessmentSubtitleStyle}>
              {isNewActiveArea
                ? t("assessment:nextArea")
                : t("assessment:currentArea")}
              :
              <StyledHeaderArea theme={theme}>
                {t(`areas.${activeArea}`)}
              </StyledHeaderArea>
            </div>
          )}

          {toggleModalShare && (
            <Button
              icon="share"
              isInverted
              iconSide={Position.Left}
              onClick={toggleModalShare}
              title={t("report:header.shareButton")}
            />
          )}
        </div>
      )}

      {(activeArea || areasCompleted) && (
        <div css={headerAssessmentKidneyStyle}>
          <Kidney
            isSmall
            activeArea={activeArea}
            areasCompleted={areasCompleted}
            isActiveAreaCompleted={!isNewActiveArea && isActiveAreaCompleted}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
