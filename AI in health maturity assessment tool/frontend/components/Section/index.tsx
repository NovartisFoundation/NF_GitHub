import { Align } from "../../utils/types";

import StyledSection from "./styles";

interface ISectionProps {
  id?: string;
  color?: string;
  align?: Align;
  backgroundColor?: string;
  children: React.ReactNode;
}

const Section = ({
  id,
  align,
  color,
  children,
  backgroundColor,
}: ISectionProps): React.ReactElement => (
  <StyledSection
    id={id}
    align={align}
    color={color}
    backgroundColor={backgroundColor}
  >
    {children}
  </StyledSection>
);

export default Section;
