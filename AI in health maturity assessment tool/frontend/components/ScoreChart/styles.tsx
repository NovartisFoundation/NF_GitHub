import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";
import { greyDark } from "../../assets/styles/colors";

export const scoreChartContainerStyle = {
  width: 180,
  height: 200,
  margin: "50px auto",
  position: "relative" as const,
  [mq[1]]: {
    width: 180,
    height: 200,
    margin: "100px auto",
  },
  [mq[2]]: {
    width: 300,
    height: 335,
  },
  [mq[3]]: {
    width: 470,
    height: 525,
  },
};

export const scoreChartLabelsContainerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute" as const,
  top: 0,
  left: 0,
};

export const scoreChartLabelStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transformOrigin: "center",

  borderRadius: "50%",
  padding: 8,
};

interface IStyledLabel {
  color: string;
  index: number;
}
export const StyledLabel = styled.div<IStyledLabel>(({ color, index }) => ({
  ...scoreChartLabelStyle,

  border: `1px solid ${color}`,
  transform: `translate(-50%, -50%) rotate(${
    (360 * index) / 6
  }deg) translateY(-300%) rotate(-${(360 * index) / 6}deg)`,

  [mq[1]]: {
    transform: `translate(-50%, -50%) rotate(${
      (360 * index) / 6
    }deg) translateY(-300%) rotate(-${(360 * index) / 6}deg)`,
  },

  [mq[2]]: {
    transform: `translate(-50%, -50%) rotate(${
      (360 * index) / 6
    }deg) translateY(-480%) rotate(-${(360 * index) / 6}deg)`,
  },

  [mq[2]]: {
    transform: `translate(-50%, -50%) rotate(${
      (360 * index) / 6
    }deg) translateY(-700%) rotate(-${(360 * index) / 6}deg)`,
  },

  "&:hover": {
    "& [id^='tooltip']": {
      display: "inline-block",
      opacity: 1,
      transition: "opacity .3s ease .3s, display .1s ease",
    },
  },
}));

export const scoreChartHintStyle = {
  position: "absolute" as const,
  transform: "rotate(30deg)",
  color: greyDark,
  fontSize: "0.6666666667em",
  textTransform: "uppercase" as const,
  top: "16%",
  left: "50%",
};
