import styled from "@emotion/styled";

import brandFont from "../../assets/styles/fonts";
import { mq } from "../../assets/styles/mediaqueries";
import { grey, brandColor, defaultTextColor } from "../../assets/styles/colors";

interface IStyledForm {
  isSmall: boolean;
}

const StyledForm = styled.form<IStyledForm>(({ isSmall }) => ({
  width: "100%",
  marginTop: 15,
  display: "flex",
  marginBottom: 5,
  marginLeft: "auto",
  marginRight: "auto",
  fontFamily: brandFont,
  flexDirection: "column" as const,

  [mq[2]]: {
    marginTop: 20,
    marginBottom: 15,
    paddingLeft: !isSmall && 20,
    paddingRight: !isSmall && 20,
  },

  [mq[3]]: {
    paddingLeft: !isSmall && 50,
    paddingRight: !isSmall && 50,
  },
}));

export default StyledForm;
