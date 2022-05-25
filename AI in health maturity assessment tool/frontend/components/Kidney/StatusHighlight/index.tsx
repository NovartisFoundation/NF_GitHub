/** @jsxImportSource @emotion/react */
import Background from "./Background";

import { kidneyAreaPaths } from "../paths";
import StyledStatusHighlightIcon from "./styles";

import { AreaTypes } from "../../../utils/types";

interface IStatusHighlightProps {
  isSmall: boolean;
  activeArea: AreaTypes;
  isActiveAreaCompleted: boolean;
}

const StatusHighlight = ({
  isSmall,
  activeArea,
  isActiveAreaCompleted,
}: IStatusHighlightProps): React.ReactElement => (
  <>
    <Background />
    {!isActiveAreaCompleted &&
      kidneyAreaPaths.map(({ area, color, paths }) => (
        <StyledStatusHighlightIcon
          key={area}
          color={color}
          isSmall={isSmall}
          d={paths.statusHighlightIcon}
          isActive={activeArea === area}
        />
      ))}
  </>
);

export default StatusHighlight;
