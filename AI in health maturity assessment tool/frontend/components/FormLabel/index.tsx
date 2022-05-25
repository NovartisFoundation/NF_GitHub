/** @jsxImportSource @emotion/react */

import Icon from "../Icon";

import {
  formLabelStyles,
  formLabelTagStyles,
  formLabelIconStyles,
} from "./styles";

import { greyDark } from "../../assets/styles/colors";

interface IFormLabelProps {
  icon?: string;
  label?: string;
  htmlFor: string;
  children: React.ReactNode;
}

const FormLabel = ({
  icon,
  label,
  htmlFor,
  children,
}: IFormLabelProps): React.ReactElement => (
  <label htmlFor={htmlFor} css={formLabelStyles}>
    {label && <span css={formLabelTagStyles}>{label}</span>}
    {icon && (
      <span css={formLabelIconStyles}>
        <Icon icon={icon} color={greyDark} />
      </span>
    )}
    {children}
  </label>
);

export default FormLabel;
