/** @jsxImportSource @emotion/react */
import Select from "react-select";
import { useTranslation } from "next-i18next";

import { CSSProperties } from "react";
import DropdownIndicator from "./Indicator";

import formSelectStyles from "./styles";
import { greyDark } from "../../assets/styles/colors";

export type OptionType = { value: string; label: string };

interface IFormSlectProps {
  id: string;
  placeholder: string;
  options: OptionType[];
  isSearchable?: boolean;
  onChange: ({ label, value }) => void;
  isSmall?: boolean;
}

const smallStyle = {
  ...formSelectStyles,
  placeholder: (): CSSProperties => ({
    fontSize: "15px !important",
  }),
  singleValue: (): CSSProperties => ({
    fontSize: "15px !important",
  }),
};
smallStyle.control = (): CSSProperties => ({
  padding: 10,
  color: greyDark,
  borderRadius: 5,
  paddingRight: 40,
});

const FormSelect = ({
  id,
  options,
  onChange,
  placeholder,
  isSearchable = true,
  isSmall = false,
}: IFormSlectProps): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Select
      instanceId={id}
      options={options}
      onChange={onChange}
      styles={isSmall ? smallStyle : formSelectStyles}
      placeholder={placeholder}
      isSearchable={isSearchable}
      components={{ DropdownIndicator }}
      noOptionsMessage={() => t("formSelect.noOptionsMessage")}
    />
  );
};

export default FormSelect;
