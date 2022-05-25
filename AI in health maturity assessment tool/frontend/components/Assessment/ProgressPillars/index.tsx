/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

import {
  StyledProgressPillars,
  StyledProgressPillarsItem,
  StyledProgressPillarsItemLabel,
} from "./styles";

import { PillarDatas } from "../../../utils/types";

interface IProgressPillarsProps {
  activePillar: number;
  totalPillars: number;
  pillars: PillarDatas[];
}

const ProgressPillars = ({
  pillars,
  activePillar,
  totalPillars,
}: IProgressPillarsProps): React.ReactElement => {
  const theme = useTheme();
  const router = useRouter();

  const { locale } = router;

  return (
    <StyledProgressPillars
      theme={theme}
      activePillar={activePillar}
      totalPillars={totalPillars}
    >
      {pillars.map(({ title }, index) => {
        const isDone = index < activePillar;
        const isActive = index === activePillar;

        return (
          <StyledProgressPillarsItem
            theme={theme}
            isDone={isDone}
            isActive={isActive}
            key={`pillar-${index.toString()}`}
          >
            <StyledProgressPillarsItemLabel theme={theme} isActive={isActive}>
              {title[locale]}
            </StyledProgressPillarsItemLabel>
          </StyledProgressPillarsItem>
        );
      })}
    </StyledProgressPillars>
  );
};

export default ProgressPillars;
