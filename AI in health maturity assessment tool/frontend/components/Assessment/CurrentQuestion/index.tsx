/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { QuestionDatas } from "../../../utils/types";
import { currentPillarStyles, StyledCurrentPillarSpanTag } from "./styles";

interface ICurrentPillarProps {
  question: QuestionDatas;
  activeQuestion: number;
  totalQuestions: number;
}

const CurrentPillar = ({
  question,
  activeQuestion,
  totalQuestions,
}: ICurrentPillarProps): React.ReactElement => {
  const theme = useTheme();
  const router = useRouter();

  const { locale } = router;
  const {
    theme: { [locale]: label },
  } = question;

  return (
    <div css={currentPillarStyles}>
      {label}

      <StyledCurrentPillarSpanTag theme={theme}>
        {activeQuestion + 1}/{totalQuestions}
      </StyledCurrentPillarSpanTag>
    </div>
  );
};

export default CurrentPillar;
