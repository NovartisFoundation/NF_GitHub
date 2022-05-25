/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

import TooltipInformation from "../../TooltipInformation";

import {
  StyledAnswerImage,
  answerImageTagStyles,
  answerImageLabelStyles,
  StyledAnswerImageInput,
} from "./styles";

import { AnswerDatas } from "../../../utils/types";

interface IActionsProps {
  index: number;
  isActive: boolean;
  answer: AnswerDatas;
  onClick: () => void;
  totalAnswers: number;
}

const AnswerImage = ({
  index,
  answer,
  onClick,
  isActive,
  totalAnswers,
}: IActionsProps): React.ReactElement => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = router;

  const {
    score,
    visual,
    answer: { [locale]: label },
    tooltip: { [locale]: tooltipLabel },
  } = answer;

  const name = `radio-${index}`;

  return (
    <StyledAnswerImage
      htmlFor={name}
      isActive={isActive}
      totalAnswers={totalAnswers}
    >
      <div css={answerImageTagStyles}>
        <Image src={visual} width="400" height="225" unoptimized />
      </div>

      <div css={answerImageLabelStyles}>
        {label}
        {tooltipLabel && (
          <TooltipInformation>{tooltipLabel}</TooltipInformation>
        )}
      </div>

      <StyledAnswerImageInput
        id={name}
        name={name}
        theme={theme}
        value={score}
        type="checkbox"
        onClick={onClick}
        isActive={isActive}
      />
    </StyledAnswerImage>
  );
};

export default AnswerImage;
