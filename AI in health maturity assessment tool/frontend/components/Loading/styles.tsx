import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { brandColor } from "../../assets/styles/colors";

const ldsEllipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ldsEllipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const ldsEllipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

interface IStyledLoading {
  isVisible: boolean;
  isTransparent: boolean;
}
export const StyledLoading = styled.div<IStyledLoading>(
  ({ isVisible, isTransparent }) => ({
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    height: "100vh",
    width: "100vw",

    position: "fixed",
    zIndex: 10,
    top: 0,
    left: 0,

    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-100%)",

    transition: "opacity .3s ease",

    backgroundColor: isTransparent ? "#ffffff75" : "#ffffff",

    h2: {
      margin: 0,
      marginBottom: -25,
      color: brandColor,
    },
  })
);

export const loaderStyle = {
  display: "inline-block" as const,
  position: "relative" as const,
  width: 80,
  height: 80,

  div: {
    position: "absolute" as const,
    top: 33,
    width: 13,
    height: 13,
    borderRadius: "50%",
    background: brandColor,
    animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",

    "&:nth-of-type(1)": {
      left: 8,
      animation: `${ldsEllipsis1} 0.6s infinite`,
    },
    "&:nth-of-type(2)": {
      left: 8,
      animation: `${ldsEllipsis2} 0.6s infinite`,
    },
    "&:nth-of-type(3)": {
      left: 32,
      animation: `${ldsEllipsis2} 0.6s infinite`,
    },
    "&:nth-of-type(4)": {
      left: 56,
      animation: `${ldsEllipsis3} 0.6s infinite`,
    },
  },
};

// Progress bar
interface IStyledProgressBar {
  statusProgressBar: number;
  totalStatusProgressBar: number;
}
export const StyledProgressBar = styled.div<IStyledProgressBar>(
  ({ statusProgressBar, totalStatusProgressBar }) => ({
    width: "50%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#00000050",
    position: "relative" as const,
    marginBottom: 10,
    marginTop: 25,

    "&:before": {
      content: `""`,
      width: "100%",
      height: "100%",
      borderRadius: 10,
      position: "absolute" as const,
      top: 0,
      left: 0,
      backgroundColor: brandColor,
      transform: `scaleX(calc(${statusProgressBar}/${totalStatusProgressBar}))`,
      transformOrigin: "left center",
      transition: "transform .6s ease-in-out",
    },
  })
);

export const statusProgressBarStyle = {
  margin: "10px 0",
  p: {
    margin: 0,
    textAlign: "center" as const,
  },
};
