import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { brandColor, defaultTextColor, grey } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const cardContainerStyle = {
  padding: 25,
  borderRadius: 5,
  boxShadow: "0 0 40px #00000015",
  marginBottom: 25,

  display: "flex",
  flexDirection: "column" as const,

  [mq[1]]: {
    marginBottom: 0,
    height: "100%",
  },
};

// HEADER
export const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};
export const cardTitleStyle = {
  fontSize: 15,
  color: grey,
  fontWeight: 900,
  margin: 0,
};

// CONTENT
interface IStyledHint {
  theme?: Theme;
  backgroundColor: string;
}
export const StyledHint = styled.p<IStyledHint>(
  ({ theme: { colors }, backgroundColor }) => ({
    fontSize: 15,
    fontWeight: 300,
    margin: 0,
    color: colors
      ? colors.primary
      : backgroundColor !== "#ffffff"
      ? "white"
      : defaultTextColor,
  })
);

export const cardOnTenStyle = {
  fontSize: "0.4em",
  marginLeft: 5,
};
export const cardDescriptionStyle = {
  marginLeft: 30,
  marginBottom: 0,
};

// NUMBER
export const cardNumberContainerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,

  p: {
    margin: 0,
    lineHeight: 1.2,
  },
};

// CHART
export const chartContentStyle = {
  alignItems: "center" as const,
  width: "100%",

  [mq[1]]: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "center",
  },

  canvas: {
    flexBasis: "50%",
    maxWidth: "450px !important",
    maxHeight: "260px !important",
  },
};
export const cardChartLegendContainerStyle = {
  width: 255,
  alignSelf: "center",
};
export const cardChartLegendItemStyle = {
  display: "flex",
  marginBottom: 22,

  "&:last-child": {
    marginBottom: 0,
  },

  p: {
    margin: 0,
    marginLeft: 21,
    fontSize: 13,
    width: "85%",
  },
};
export const cardChartLegendStyle = {
  width: 8,
  minWidth: 8,
  height: 8,
  borderRadius: "50%",
  marginTop: 7,
};

// LIST
export const cardListContainer = {
  width: "100%",

  ul: { padding: 0, margin: 0, width: "100%" },
};
export const cardListSeparatorStyle = {
  height: 1,
  width: "90%",
  backgroundColor: grey,
  alignSelf: "center" as const,
  margin: "25px auto",
};
export const cardListTitleStyle = {
  fontSize: 15,
  color: grey,
  fontWeight: 900,
  marginBottom: 18,
  width: "100%",
};
export const cardListItemStyle = {
  paddingLeft: 15,
  display: "flex",
  alignItems: "center" as const,
  justifyContent: "space-between",

  h3: {
    fontSize: "1.0666666667em",
  },
};

interface IStyledCard {
  color: string;
}
export const StyledCard = styled.div<IStyledCard>(({ color }) => ({
  ...cardContainerStyle,
  boxShadow: `0 0 40px ${color === "#ffffff" ? "#00000015" : `${color}70`}`,
  backgroundColor: color,
}));

interface IStyledNumber {
  theme: Theme;
  numberColor: string;
  backgroundColor: string;
}
export const StyledNumber = styled.p<IStyledNumber>(
  ({ theme: { colors }, backgroundColor, numberColor }) => ({
    fontSize: 50,
    fontWeight: 900,
    color:
      numberColor ||
      (colors
        ? colors.primary
        : backgroundColor !== "#ffffff"
        ? "white"
        : brandColor),
    margin: 0,
  })
);

interface IStyledTitle {
  theme?: Theme;
}
export const StyledTitle = styled.p<IStyledTitle>(({ theme: { colors } }) => ({
  ...cardTitleStyle,
  color: colors ? colors.primary : "#00000050",
}));

interface IStyledContent {
  hasDescription?: boolean;
}
export const StyledContent = styled.div<IStyledContent>(
  ({ hasDescription }) => ({
    width: "100%",
    display: "flex",
    flexDirection: hasDescription ? ("row" as const) : ("column" as const),
    alignItems: "center" as const,
    justifyContent: "space-around" as const,
    height: "100%",
    paddingTop: 25,
  })
);
