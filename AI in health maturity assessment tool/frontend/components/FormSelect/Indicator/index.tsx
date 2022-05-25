/** @jsxImportSource @emotion/react */
import { components, DropdownIndicatorProps } from "react-select";

import Icon from "../../Icon";

import { brandColor } from "../../../assets/styles/colors";

const FormSelectIndicator = (
  props: DropdownIndicatorProps
): React.ReactElement => (
  <components.DropdownIndicator {...props}>
    <Icon icon="expand_more" color={brandColor} size={15} />
  </components.DropdownIndicator>
);

export default FormSelectIndicator;
