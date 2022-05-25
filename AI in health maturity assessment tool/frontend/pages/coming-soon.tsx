import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "../components/Head";
import Title from "../components/Title";
import Section from "../components/Section";
import SectionText from "../components/SectionText";

import { Align } from "../utils/types";

const ComingSoon = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Head
        pageURL={t("url")}
        pageTitle={t("title")}
        pageDescription={t("description")}
      />

      <Section align={Align.Center}>
        <Title title={t("comingSoon.title")} />

        <SectionText size={40}>
          <p>{t("comingSoon.description")}</p>
        </SectionText>
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default ComingSoon;
