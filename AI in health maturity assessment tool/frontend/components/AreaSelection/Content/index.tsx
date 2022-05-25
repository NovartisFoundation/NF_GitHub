/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { motion, useAnimation } from "framer-motion";

import Icon from "../../Icon";

import {
  contentStyles,
  StyledContentTitle,
  contentDurationStyles,
  contentDurationIconStyles,
  contentSaveProgress,
} from "./styles";

import { grey } from "../../../assets/styles/colors";

import { AreaTypes, AssessmentStatus } from "../../../utils/types";

interface IContentProps {
  activeArea: AreaTypes;
  status: AssessmentStatus;
}

const variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};

const Content = ({
  status,
  activeArea: activeAreaFromProps,
}: IContentProps): React.ReactElement => {
  const theme = useTheme();
  const { t } = useTranslation();
  const controls = useAnimation();

  const [activeArea, setActiveArea] = useState(activeAreaFromProps);
  const [theURL, setTheURL] = useState("");

  useEffect(() => {
    setTheURL(window.location.href);
    controls.start("hidden");

    const timeout = setTimeout(() => {
      setActiveArea(activeAreaFromProps);
      controls.start("visible");
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeAreaFromProps]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants}
      css={contentStyles}
    >
      <StyledContentTitle theme={theme}>
        {activeArea === "default"
          ? t(`assessment:selectionArea.areas.default.title.${status}`)
          : t(`areas.${activeArea}`)}
      </StyledContentTitle>
      <p>{t(`assessment:selectionArea.areas.${activeArea}.text`)}</p>
      {activeArea !== "default" && (
        <p css={contentDurationStyles}>
          <span css={contentDurationIconStyles}>
            <Icon icon="timer" color={grey} size={15} />
          </span>
          {t(`assessment:selectionArea.areas.${activeArea}.duration`)}
        </p>
      )}
      <em css={contentSaveProgress}>
        {t(`assessment:selectionArea.saveProgress`)} {theURL}
      </em>
    </motion.div>
  );
};

export default Content;
