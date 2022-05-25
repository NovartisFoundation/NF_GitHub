import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { mq } from "../../../assets/styles/mediaqueries";

interface IStyledBadgeLabel {
  theme: Theme;
}

const StyledBadgeLabel = styled.div<IStyledBadgeLabel>(
  ({ theme: { colors } }) => ({
    paddingTop: 15,
    fontWeight: 700,
    fontSize: "2em",
    margin: "0 auto",
    color: colors.primary,
    textTransform: "uppercase",

    [mq[1]]: {
      paddingTop: 20,
    },

    [mq[2]]: {
      paddingTop: 25,
      fontSize: "2.5em",
    },

    [mq[3]]: {
      paddingTop: 30,
    },
  })
);

export default StyledBadgeLabel;
