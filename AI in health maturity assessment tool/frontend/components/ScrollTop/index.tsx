/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useViewportScroll, useTransform, motion } from "framer-motion";

import Icon from "../Icon";

import scrollTopValue from "../../config/scrollTop";

import scrollTopStyle from "./styles";

const ScrollTop = (): React.ReactElement => {
  const { t } = useTranslation();
  const { scrollY } = useViewportScroll();
  const [isVisible, setVisible] = useState(false);

  const xRange = [scrollTopValue, scrollTopValue + 50];
  const opacity = useTransform(scrollY, xRange, [0, 1]);

  const handleIsVisible = () => {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < scrollTopValue && isVisible) setVisible(false);
    if (scrollPosition >= scrollTopValue && !isVisible) setVisible(true);
  };

  const onClickScrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    handleIsVisible();
    window.addEventListener("scroll", handleIsVisible);

    return () => {
      window.removeEventListener("scroll", handleIsVisible);
    };
  });

  return (
    <motion.button
      style={{ opacity }}
      css={scrollTopStyle}
      onClick={onClickScrollTop}
      aria-label={t("common:scrollTop")}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2, type: "spring", stiffness: 100 },
      }}
    >
      <Icon icon="arrow_upward" color="white" size={26} />
    </motion.button>
  );
};

export default ScrollTop;
