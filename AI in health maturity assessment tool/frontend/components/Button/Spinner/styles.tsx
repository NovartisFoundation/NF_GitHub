import { keyframes } from "@emotion/react";

import { grey } from "../../../assets/styles/colors";

const spinnerKeyframes = keyframes`
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(2turn);
  }
`;

const spinnerStyles = {
  width: 15,
  height: 15,
  margin: "auto",
  borderRadius: "50%",
  border: `2px solid ${grey}`,
  borderTopColor: "transparent",
  animation: `${spinnerKeyframes} 1s ease infinite`,
};

export default spinnerStyles;
