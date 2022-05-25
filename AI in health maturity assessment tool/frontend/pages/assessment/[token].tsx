import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@emotion/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ErrorPage from "../_error";

import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Assessment from "../../components/Assessment";

import {
  IUserData,
  getActiveAreaFromLocalStorage,
  getAreasCompletedFromLocalStorage,
  getNameFromLocalStorage,
  getTokenFromLocalStorage,
  replaceUserDataOnLocalStorage,
  resetActiveAssessmentOnLocalStorage,
} from "../../utils/localStorage";
import isIE from "../../utils/isIE";
import { AreaTypes, AreaDatas } from "../../utils/types";
import addNameToTranslation from "../../utils/addNameToTranslation";

import theme from "../../assets/styles/theme";

import { fetchQuestions, getSession } from "../../libs/assessment";

interface IAssessmentProps {
  userData: IUserData;
  assessment: AreaDatas[];
}

const AssessmentPage = ({
  userData,
  assessment,
}: IAssessmentProps): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const { t } = useTranslation();

  if (!assessment) return <Loading />;

  // If external user ; the new local storage is not empty
  // so replace the current local storage with this new local storage
  replaceUserDataOnLocalStorage(userData);

  // if (
  //   !getActiveAreaFromLocalStorage() ||
  //   getAreasCompletedFromLocalStorage().find(
  //     (area) => getActiveAreaFromLocalStorage() === area
  //   )
  // ) {
  if (!getActiveAreaFromLocalStorage()) {
    // If not active area, it means external user arrived on the assessment
    // Or they already did this area
    // => Go to selection area
    router.push(`/assessment-selectionArea/${getTokenFromLocalStorage()}`);
    return <Loading />;
  }

  const [name, setName] = useState("");
  const [areasCompleted, setAreasCompleted] = useState([]);
  const [activeArea, setActiveArea] = useState<AreaTypes>("default");

  useEffect(() => {
    // Reset active assessment
    resetActiveAssessmentOnLocalStorage();
    setAreasCompleted(getAreasCompletedFromLocalStorage());
  }, []);

  useEffect(() => {
    setName(getNameFromLocalStorage());
    setActiveArea(getActiveAreaFromLocalStorage());
  });

  return (
    <>
      <Head
        pageURL={t("assessment:url")}
        pageTitle={t("assessment:title")}
        pageDescription={t("assessment:description")}
      />

      <ThemeProvider theme={theme[activeArea || "peopleWorkforce"]}>
        <Header
          activeArea={activeArea}
          areasCompleted={areasCompleted}
          title={t(addNameToTranslation("assessment:question.title", name), {
            name,
          })}
        />

        <main>
          <Container>
            <Assessment
              assessment={assessment}
              activeArea={activeArea}
              areasCompleted={areasCompleted}
            />
          </Container>
        </main>
      </ThemeProvider>

      <Footer hasLanguageSelector />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { token } = params; // Get the token from the URL

  const { country, group, results, role } = await getSession(token as string); // Get session data from API
  const assessment = await fetchQuestions(); // Get assessment data from API

  if (!results) {
    return {
      notFound: true,
    };
  }

  // Transform it to local storage object
  const userData = {
    role,
    token,
    country,
    group,
    areasCompleted: results.map((result) => result.area),
  };

  return {
    props: {
      userData,
      assessment,
      ...(await serverSideTranslations(locale, ["assessment", "common"])),
    },
    revalidate: 3,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { token: "58c89dxf1e" } }],
  fallback: "blocking",
});

export default AssessmentPage;
