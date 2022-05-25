import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import Button from "../components/Button";
import Head from "../components/Head";
import Title from "../components/Title";
import Section from "../components/Section";
import SectionText from "../components/SectionText";
import Footer from "../components/Footer";

import { Align } from "../utils/types";
import Container from "../components/Container";

const Custom404 = (): React.ReactElement => {
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

      <main>
        <Container isVerticallyCentered isCentered>
          <Title title={t("error.404.title")} />

          <SectionText size={40}>
            <p>{t("error.404.description")}</p>
          </SectionText>
          <Button onClick={goHome} title={t("error.404.button")} />
        </Container>
      </main>
      <Footer hasLanguageSelector />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Custom404;
