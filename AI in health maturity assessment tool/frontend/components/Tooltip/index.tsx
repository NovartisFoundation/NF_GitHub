/** @jsxImportSource @emotion/react */
import tooltipStyle from "./styles";

interface ITooltipProps {
  children: React.ReactNode;
  id: string;
}

const Tooltip = ({ children, id }: ITooltipProps): React.ReactElement => (
  <div css={tooltipStyle} id={id}>
    {children}
  </div>
);

export default Tooltip;
