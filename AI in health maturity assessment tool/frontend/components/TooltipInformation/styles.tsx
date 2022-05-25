export const tooltipInformationStyle = {
  top: 3,
  marginLeft: 5,
  display: "inline-block",
  position: "relative" as const,
};

export const tooltipInformationButtonStyle = {
  cursor: "pointer",
};

export const tooltipInformationBoxStyle = {
  left: "50%",
  minWidth: 200,
  top: "calc(100% + 10px)",
  textAlign: "center" as const,
  position: "absolute" as const,
  transform: "translate(-50%,0)",
  zIndex: 100,
};
