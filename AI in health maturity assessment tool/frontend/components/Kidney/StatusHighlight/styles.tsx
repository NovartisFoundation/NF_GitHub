import styled from "@emotion/styled";

interface IStyledStatusHighlightIcon {
  color: string;
  isSmall: boolean;
  isActive: boolean;
}

const StyledStatusHighlightIcon = styled.path<IStyledStatusHighlightIcon>(
  ({ color, isSmall, isActive }) => ({
    fill: color,
    opacity: isActive ? 1 : 0,
    transition: "all 0.5s ease",
    transformOrigin: !isSmall && "35% 50%",
    transform: isSmall
      ? "translate(-18%,-22%) scale(1.5)"
      : isActive
      ? "scale(1)"
      : "scale(0)",
  })
);

export default StyledStatusHighlightIcon;
