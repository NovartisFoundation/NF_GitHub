/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";

import Kidney from "../Kidney";
import Content from "./Content";

import areaSelectionStyles from "./styles";

import theme from "../../assets/styles/theme";

import { AreaTypes, AssessmentStatus } from "../../utils/types";
import { getAreasCompletedFromLocalStorage } from "../../utils/localStorage";

interface IAreaSelectionProps {
  area?: AreaTypes;
  status: AssessmentStatus;
  parentCallback?: (area: AreaTypes) => void;
}

const AreaSelection = ({
  status,
  parentCallback,
  area = "default",
}: IAreaSelectionProps): React.ReactElement => {
  const [activeArea, setActiveArea] = useState(area);
  const [areasCompleted, setAreasCompleted] = useState([]);

  const onChangeArea = (areaSelected: AreaTypes) => {
    setActiveArea(areaSelected);
    if (parentCallback) parentCallback(areaSelected);
  };

  useEffect(() => {
    setAreasCompleted(getAreasCompletedFromLocalStorage());
  }, []);

  return (
    <ThemeProvider theme={theme[activeArea]}>
      <div css={areaSelectionStyles}>
        <Kidney
          activeArea={activeArea}
          onChangeArea={onChangeArea}
          areasCompleted={areasCompleted}
        />
        <Content activeArea={activeArea} status={status} />
      </div>
    </ThemeProvider>
  );
};

export default AreaSelection;
