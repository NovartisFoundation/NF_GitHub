import styled from "@emotion/styled";

import { grey } from "../../assets/styles/colors";
import { mq } from "../../assets/styles/mediaqueries";

export const badgeListTitleStyle = {
  paddingBottom: 15,
  borderBottom: `1px solid ${grey}`,
  marginBottom: 40,
};

export const badgeListStyle = {
  display: "flex" as const,
  flexWrap: "wrap" as const,
  justifyContent: "space-between" as const,
  padding: 0,
  margin: 0,
};

export const badgeListItemStyle = {
  width: "33.33%",

  [mq[1]]: {
    width: "auto",
  },
};

interface IStyledText {
  color: string;
}
export const StyledText = styled.p<IStyledText>(({ color }) => ({
  color,
  fontWeight: 900,
  marginTop: 25,
  textAlign: "center",
  textTransform: "uppercase",
}));
