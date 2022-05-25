import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

import { badgesCollectionItemStyles } from "../styles";

interface IStyledBadge {
  theme: Theme;
}

const StyledBadge = styled.li<IStyledBadge>(({ theme }) => ({
  ...badgesCollectionItemStyles,
  border: `1px solid ${theme.colors.primary}`,
}));

export default StyledBadge;
