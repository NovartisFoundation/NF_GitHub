import styled from "@emotion/styled";

import { defaultIconColor } from "../../assets/styles/colors";

export const iconStyle = {
  display: "block",
  verticalAlign: "middle",
};

interface IStyledIconPath {
  fill?: string;
}

export const StyledIconPath = styled.path<IStyledIconPath>(
  ({ fill = defaultIconColor }) => ({
    fill,
    transition: "all .5s ease-in-out",
  })
);
