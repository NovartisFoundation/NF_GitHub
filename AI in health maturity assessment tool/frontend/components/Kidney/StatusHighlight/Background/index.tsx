/** @jsxImportSource @emotion/react */
import statusHighlightBackgroundStyles from "./styles";

import { kidneySatusHighlightPaths } from "../../paths";

const StatusHighlightBackground = (): React.ReactElement => (
  <>
    <filter id="dropshadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
      <feOffset dx="5" dy="5" result="offsetblur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.2" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <path
      filter="url(#dropshadow)"
      css={statusHighlightBackgroundStyles}
      d={kidneySatusHighlightPaths.paths.background}
    />
  </>
);

export default StatusHighlightBackground;
