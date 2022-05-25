import { CSSProperties } from "react";

import {
  grey,
  greyDark,
  greyLight,
  brandColor,
  brandColorLight,
  brandColorXLight,
  defaultTextColor,
} from "../../assets/styles/colors";

const formSelectStyles = {
  container: (styles, { isFocused }): CSSProperties => ({
    borderRadius: 5,
    position: "relative" as const,
    border: isFocused ? `1px solid ${brandColor}` : `1px solid ${grey}`,
  }),

  control: (): CSSProperties => ({
    padding: 15,
    paddingLeft: 0,
    color: greyDark,
    borderRadius: 5,
    paddingRight: 40,
  }),

  indicatorsContainer: (): CSSProperties => ({
    top: "50%",
    right: 15,
    width: 15,
    height: 15,
    borderRadius: "50%",
    position: "absolute" as const,
    transform: "translate(0, -50%)",
    backgroundColor: brandColorLight,
  }),

  dropdownIndicator: (): CSSProperties => ({}),

  input: (): CSSProperties => ({
    margin: 0,
    padding: 0,
  }),

  valueContainer: (styles): CSSProperties => ({
    ...styles,
    margin: 0,
    padding: 0,
    fontWeight: 400,
  }),

  menu: (styles): CSSProperties => ({
    ...styles,
    left: 0,
    zIndex: 10,
  }),

  option: (styles, { isFocused, isSelected }): CSSProperties => ({
    ...styles,
    cursor: "pointer",
    paddingLeft: 30,
    paddingRight: 30,
    color: defaultTextColor,
    backgroundColor: isSelected
      ? greyLight
      : isFocused
      ? brandColorXLight
      : null,
  }),
};

export default formSelectStyles;
