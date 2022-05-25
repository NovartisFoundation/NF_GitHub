/** @jsxImportSource @emotion/react */

import DefaultText from "./DefaultText";
import CompletedIcon from "./CompletedIcon";
import StatusHighlight from "./StatusHighlight";

import {
  StyledKidney,
  kidneySvgStyles,
  StyledKidneyAreaPath,
  kidneyAreaIconPathStyles,
} from "./styles";

import { kidneyAreaPaths } from "./paths";

import { Area, AreaTypes } from "../../utils/types";

interface IKidneyProps {
  isSmall?: boolean;
  activeArea?: AreaTypes;
  areasCompleted?: Area[];
  isActiveAreaCompleted?: boolean;
  onChangeArea?: (area: Area) => void;
}

const Kidney = ({
  activeArea,
  onChangeArea,
  isSmall = false,
  areasCompleted = [],
  isActiveAreaCompleted = false,
}: IKidneyProps): React.ReactElement => (
  <StyledKidney isSmall={isSmall}>
    <svg
      width="400"
      height="350"
      viewBox="0 0 400 350"
      css={kidneySvgStyles}
      xmlns="http://www.w3.org/2000/svg"
    >
      {kidneyAreaPaths.map(({ area, color, paths }) => (
        <StyledKidneyAreaPath
          key={area}
          color={color}
          d={paths.background}
          isSelected={activeArea === area}
          onClick={() => onChangeArea(area)}
          isActive={areasCompleted.includes(area)}
        />
      ))}

      <StatusHighlight
        isSmall={isSmall}
        activeArea={activeArea}
        isActiveAreaCompleted={isActiveAreaCompleted}
      />

      {!isSmall &&
        kidneyAreaPaths.map(({ area, paths }) => (
          <path key={area} d={paths.icon} css={kidneyAreaIconPathStyles} />
        ))}
    </svg>

    {!isSmall && activeArea === "default" && <DefaultText />}

    {isSmall && isActiveAreaCompleted && <CompletedIcon />}
  </StyledKidney>
);

export default Kidney;
