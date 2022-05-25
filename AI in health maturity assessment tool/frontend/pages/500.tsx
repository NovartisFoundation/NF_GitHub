import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import Button from "../components/Button";
import Head from "../components/Head";
import Title from "../components/Title";
import Section from "../components/Section";
import SectionText from "../components/SectionText";

import { Align } from "../utils/types";

const Custom500 = (): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();

  const goHome = () => {
    router.push(`/`);
  };

  return (
    <>
      <Head
        pageURL={t("url")}
        pageTitle={t("title")}
        pageDescription={t("description")}
      />

      <Section align={Align.Center}>
        <Title title={t("error.500.title")} />

        <SectionText size={40}>
          <p>{t("error.500.description")}</p>
        </SectionText>
        <Button onClick={goHome} title={t("error.404.button")} />
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Custom500;
