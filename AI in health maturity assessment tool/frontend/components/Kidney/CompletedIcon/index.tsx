/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import Icon from "../../Icon";

import completedIconStyles from "./styles";

import { green } from "../../../assets/styles/colors";

import { isMobile } from "../../../utils/windowWidth";

const CompletedIcon = (): React.ReactElement => {
  const [isWindowWidthMobile, setWindowWidthMobile] = useState(true);

  useEffect(() => {
    setWindowWidthMobile(isMobile());

    window.addEventListener("resize", () => setWindowWidthMobile(isMobile()));

    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidthMobile(isMobile())
      );
    };
  });

  return (
    <span css={completedIconStyles}>
      <Icon icon="done" size={isWindowWidthMobile ? 25 : 35} color={green} />
    </span>
  );
};

export default CompletedIcon;
