/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import ButtonDownloadBadge from "../ButtonDownloadBadge";

import { completionBadgeStyle, completionBadgeTitleStyle } from "./styles";

const CompletionBadge = (): React.ReactElement => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <div css={completionBadgeStyle}>
      <h3 css={completionBadgeTitleStyle}>
        {t("report:completionBadge.title")}
      </h3>

      <Image
        unoptimized
        width={350}
        height={350}
        alt={t("report:completionBadge.title")}
        src={`/static/completionBadge/${locale}/badge.jpg`}
      />

      <ButtonDownloadBadge
        label={t("report:completionBadge.button")}
        defaultFilename={t("report:completionBadge.title")}
        badges={`/static/completionBadge/${locale}/badge.jpg`}
      />
    </div>
  );
};

export default CompletionBadge;
