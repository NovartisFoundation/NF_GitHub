/** @jsxImportSource @emotion/react */
import { useState } from "react";

import Box from "../Box";
import Icon from "../Icon";

import {
  tooltipInformationStyle,
  tooltipInformationButtonStyle,
  tooltipInformationBoxStyle,
} from "./styles";

import { defaultTextColor } from "../../assets/styles/colors";

interface ITooltipProps {
  children: React.ReactNode;
}

const TooltipInformation = ({
  children,
}: ITooltipProps): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div css={tooltipInformationStyle}>
      <button
        type="button"
        css={tooltipInformationButtonStyle}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Icon icon="info" color={defaultTextColor} size={15} />
      </button>

      {isVisible && (
        <div css={tooltipInformationBoxStyle}>
          <Box isSmall>{children}</Box>
        </div>
      )}
    </div>
  );
};

export default TooltipInformation;
