import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import { mq } from "../../../assets/styles/mediaqueries";
import { grey } from "../../../assets/styles/colors";

export const contentStyles = {
  flex: 1,
  paddingTop: 30,

  [mq[1]]: {
    paddingTop: 0,
    paddingLeft: 15,
  },

  [mq[2]]: {
    paddingLeft: 20,
  },

  [mq[3]]: {
    paddingLeft: 30,
  },
};

interface IStyledContentTitle {
  theme: Theme;
}

export const StyledContentTitle = styled.h4<IStyledContentTitle>(
  ({ theme: { colors } }) => ({
    color: colors.primary,
  })
);

export const contentDurationStyles = {
  color: grey,
  display: "flex",
};

export const contentDurationIconStyles = {
  paddingTop: 2,
  paddingRight: 10,

  [mq[2]]: {
    paddingRight: 20,
  },
};

export const contentSaveProgress = {
  fontSize: 12,
};
