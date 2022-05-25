/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

import TooltipInformation from "../../TooltipInformation";

import {
  StyledAnswerEmoji,
  answerEmojiInputStyles,
  StyledEmojiVisual,
} from "./styles";

import { AnswerDatas } from "../../../utils/types";

interface IAnswerEmojiProps {
  index: number;
  isActive: boolean;
  answer: AnswerDatas;
  onClick: () => void;
}

const AnswerEmoji = ({
  index,
  answer,
  onClick,
  isActive,
}: IAnswerEmojiProps): React.ReactElement => {
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
    <StyledAnswerEmoji theme={theme} htmlFor={name} isActive={isActive}>
      <StyledEmojiVisual theme={theme} isActive={isActive} visual={visual} />
      {label}
      {tooltipLabel && <TooltipInformation>{tooltipLabel}</TooltipInformation>}
      <input
        id={name}
        name={name}
        type="radio"
        value={score}
        onClick={onClick}
        css={answerEmojiInputStyles}
      />
    </StyledAnswerEmoji>
  );
};

export default AnswerEmoji;
