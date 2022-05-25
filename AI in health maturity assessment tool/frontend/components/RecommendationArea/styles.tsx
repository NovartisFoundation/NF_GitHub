import styled from "@emotion/styled";
import { grey } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const recommendationTitleStyle = {
  paddingBottom: 13,
  borderBottom: `1px solid ${grey}`,
  marginBottom: 40,
  marginTop: 50,
};

export const recommendationCardListStyle = {
  display: "flex",
  flexFlow: "wrap",
  justifyContent: "space-between",
};

export const recommandationCardButtonStyle = {
  cursor: "pointer",
};

export const recommendationCardContainerStyle = {
  width: "100%",
  padding: "20px 30px",
  boxShadow: `0 0 25px #00000015`,
  borderRadius: 5,
  marginBottom: 25,

  [mq[1]]: {
    width: "45%",
  },

  [mq[2]]: {
    width: "30%",
    flexBasis: "30%",
  },
};

export const recommendationCardHeaderStyle = {
  display: "flex",
  alignItems: "center" as const,
};

export const recommandationScoreStyle = {
  padding: 20,
  textAlign: "center" as const,
};

interface IStyledScore {
  color: string;
}
export const StyledScore = styled.span<IStyledScore>(({ color }) => ({
  color,
  fontSize: "4em",
  fontWeight: 900,
  display: "inline-block",
  lineHeight: 1,
}));

export const recommendationCardFooter = {
  display: "flex",

  div: {
    flexBasis: "50%",

    "&:nth-of-type(1)": {
      paddingRight: 20,
      borderRight: `1px solid ${grey}`,
    },
    "&:last-child": {
      paddingLeft: 20,
    },
    p: {
      margin: 0,
      fontSize: "0.8em",
      fontWeight: 400,
    },
  },

  strong: {
    color: grey,
    fontSize: "0.8em",
    fontWeight: 900,
    marginBottom: 10,

    display: "flex",
    alignItems: "center" as const,
    justifyContent: "center",

    svg: {
      display: "inline-block",
      marginLeft: 15,
    },
  },
};

interface IStyledRecommendationCardTitle {
  color: string;
}
export const StyledRecommendationCardTitle = styled.div<IStyledRecommendationCardTitle>(
  ({ color }) => ({
    color,
    margin: 0,
    flexBasis: "80%",
    marginLeft: 20,
    fontWeight: 900,
  })
);
