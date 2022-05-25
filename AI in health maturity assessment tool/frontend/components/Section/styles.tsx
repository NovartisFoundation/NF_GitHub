import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { defaultTextColor } from "../../assets/styles/colors";

import { Align } from "../../utils/types";

interface IStyledSection {
  align?: Align;
  color?: string;
  backgroundColor?: string;
}
const StyledSection = styled.section<IStyledSection>(
  ({
    align = Align.Left,
    color = defaultTextColor,
    backgroundColor = "white",
  }) => ({
    color,
    padding: 0,
    paddingTop: 50,
    backgroundColor,
    display: "flex",
    paddingBottom: 50,
    textAlign: "left",
    position: "relative",
    flexDirection: "column",
    alignItems: align === Align.Center && "center",

    [mq[1]]: {
      paddingTop: 30,
      paddingBottom: 30,
    },

    [mq[2]]: {
      paddingTop: 40,
      paddingBottom: 40,
    },

    [mq[3]]: {
      paddingTop: 60,
      paddingBottom: 60,
    },
  })
);

export default StyledSection;
