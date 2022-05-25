/** @jsxImportSource @emotion/react */

import { CSVLink } from "react-csv";
import Box from "../Box";
import Icon from "../Icon";

import {
  StyledPopup,
  PopupTitleStyles,
  PopupCloseButtonStyles,
  downloadButtonStyle,
} from "./styles";

import { brandColor } from "../../assets/styles/colors";
import { wrapParagraph } from "../../utils/wrapContent";

interface IPopUpProps {
  title: string;
  text: string[];
  isOpen: boolean;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color?: string;
  hasCloseButton?: boolean;
  togglePopUp: (boolean) => void;
  hasDownloadButton?: boolean;
  downloadButtonTitle?: string;
  downloadFileName?: string;
  downloadData?: any;
  downloadDataHeaders?: any;
}

const PopUp = ({
  top,
  left,
  right,
  bottom,
  title,
  text,
  isOpen,
  togglePopUp,
  hasDownloadButton = false,
  hasCloseButton = true,
  downloadButtonTitle,
  downloadData,
  downloadFileName,
  downloadDataHeaders,
  color = brandColor,
}: IPopUpProps): React.ReactElement => (
  <StyledPopup
    top={top}
    left={left}
    right={right}
    bottom={bottom}
    isOpen={isOpen}
    color={color}
  >
    <Box>
      {hasCloseButton && (
        <button
          type="button"
          onClick={togglePopUp}
          css={PopupCloseButtonStyles}
        >
          <Icon icon="close" color={brandColor} />
        </button>
      )}
      <strong css={PopupTitleStyles}>{title}</strong>
      {wrapParagraph(text)}

      {hasDownloadButton &&
        downloadButtonTitle &&
        downloadData &&
        downloadDataHeaders && (
          <CSVLink
            data={downloadData}
            headers={downloadDataHeaders}
            filename={downloadFileName}
          >
            <button css={downloadButtonStyle} type="button">
              {downloadButtonTitle}
            </button>
          </CSVLink>
        )}
    </Box>
  </StyledPopup>
);

export default PopUp;
