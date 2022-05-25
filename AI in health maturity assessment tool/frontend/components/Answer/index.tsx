/** @jsxImportSource @emotion/react */

import Emoji from "./Emoji";
import Image from "./Image";

import { AnswerDatas, QuestionTypes } from "../../utils/types";

interface IAnswerProps {
  type: string;
  index: number;
  isActive: boolean;
  answer: AnswerDatas;
  onClick: () => void;
  totalAnswers: number;
}

const Answer = ({
  type,
  index,
  answer,
  onClick,
  isActive,
  totalAnswers,
}: IAnswerProps): React.ReactElement =>
  type === QuestionTypes.emoji ? (
    <Emoji
      index={index}
      answer={answer}
      onClick={onClick}
      isActive={isActive}
    />
  ) : (
    <Image
      index={index}
      answer={answer}
      onClick={onClick}
      isActive={isActive}
      totalAnswers={totalAnswers}
    />
  );

export default Answer;
