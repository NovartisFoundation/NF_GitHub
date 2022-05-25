const tooltipStyle = {
  maxWidth: 100,
  width: "max-content",
  backgroundColor: "#ffffff",
  borderRadius: 5,
  padding: 10,
  boxShadow: "0 4px 15px #00000015",

  position: "absolute" as const,
  top: "calc(100% + 10px)",
  left: "50%",
  transform: "translateX(-50%)",

  display: "none",
  opacity: 0,

  transition: "opacity .3s ease, display .1s ease .3s",

  "*": {
    margin: 0,
    fontSize: "0.6666666667em",
  },
};

export default tooltipStyle;
