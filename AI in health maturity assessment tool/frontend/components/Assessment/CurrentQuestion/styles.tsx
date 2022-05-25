import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../../assets/styles/mediaqueries";

export const currentPillarStyles = {
  fontWeight: 400,
  marginBottom: 10,
  fontSize: "0.9em",
};

interface IStyledCurrentPillarSpanTag {
  theme: Theme;
}

export const StyledCurrentPillarSpanTag = styled.span<IStyledCurrentPillarSpanTag>(
  ({ theme: { colors } }) => ({
    paddingLeft: 10,
    color: colors.primary,

    [mq[2]]: {
      paddingLeft: 20,
    },
  })
);
