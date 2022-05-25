import styled from "@emotion/styled";

const bodyStyle = {
  td: {
    paddingBottom: 15,
    "&:first-of-type": {
      marginLeft: 45,
    },
    "&:last-of-type": {
      marginRight: 45,
    },
  },
};

export const numberColumnStyle = {
  width: 45,
  paddingRight: "0 !important",
};

interface IStyledCell {
  isBold?: boolean;
}
export const StyledCell = styled.td<IStyledCell>(({ isBold }) => ({
  fontWeight: isBold ? 900 : 400,
}));

export default bodyStyle;
