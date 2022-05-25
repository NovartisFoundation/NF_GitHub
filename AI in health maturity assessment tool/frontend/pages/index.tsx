import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ErrorPage from "./_error";

import Head from "../components/Head";
import Title from "../components/Title";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Actions from "../components/Actions";
import Container from "../components/Container";

import isIE from "../utils/isIE";

const AssessementOnboarding = (): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const { t } = useTranslation();

  const onClick = () => {
    router.push("/assessment-start");
  };

  return (
    <>
      <Head
        pageURL={t("assessment:url")}
        pageTitle={t("assessment:title")}
        pageDescription={t("assessment:description")}
      />

      <main>
        <Container isVerticallyCentered>
          <Title
            hasBackground
            isHomepage
            title={t("assessment:onboarding.title")}
            description={t("assessment:onboarding.subtitle")}
          />
          <Actions>
            <div>
              <Button
                onClick={onClick}
                title={t("assessment:onboarding.buttons.start")}
              />
            </div>
          </Actions>
        </Container>
      </main>

      <Footer hasLanguageSelector />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["assessment", "common"])),
  },
});

export default AssessementOnboarding;
