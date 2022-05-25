/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";

import defaultTextStyles from "./styles";

const DefaultText = (): React.ReactElement => {
  const { t } = useTranslation();
  return <p css={defaultTextStyles}>{t("kidney.defaultText")}</p>;
};

export default DefaultText;
