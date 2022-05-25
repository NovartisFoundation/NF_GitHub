import StyledSectionText from "./styles";

interface ISectionTextProps {
  size?: number;
  children: React.ReactNode;
}

const SectionText = ({
  children,
  size = 100,
}: ISectionTextProps): React.ReactElement => (
  <StyledSectionText size={size}>{children}</StyledSectionText>
);

export default SectionText;
