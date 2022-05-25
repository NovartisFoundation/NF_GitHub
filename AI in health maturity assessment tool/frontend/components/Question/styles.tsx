import styled from "@emotion/styled";

import { grey } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const questionStyles = {
  width: "100%",
  marginBottom: 15,

  [mq[1]]: {
    marginBottom: 20,
  },

  [mq[2]]: {
    marginBottom: 25,
  },

  [mq[3]]: {
    marginBottom: 30,
  },
};

export const questionTextStyles = {
  color: grey,
};

interface IStyledQuestionAnswer {
  hasColumn: boolean;
  totalAnswers: number;
}

export const StyledQuestionAnswers = styled.div<IStyledQuestionAnswer>(
  ({ hasColumn, totalAnswers }) => ({
    paddingTop: 15,
    margin: "auto",
    display: "flex",
    position: "relative",
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "space-between",
    width: hasColumn && totalAnswers === 2 ? "75%" : "100%",

    [mq[1]]: {
      paddingTop: 20,
      flexDirection: hasColumn ? "row" : "column",
    },

    [mq[2]]: {
      paddingTop: 25,
    },

    [mq[3]]: {
      paddingTop: 30,
    },
  })
);
