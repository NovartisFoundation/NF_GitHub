import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@emotion/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ErrorPage from "../_error";

import Head from "../../components/Head";
import Title from "../../components/Title";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Actions from "../../components/Actions";
import Container from "../../components/Container";
import AreaSelection from "../../components/AreaSelection";

import {
  getNameFromLocalStorage,
  addActiveAreaOnLocalStorage,
  getAreasCompletedFromLocalStorage,
  getTokenFromLocalStorage,
  IUserData,
  replaceUserDataOnLocalStorage,
} from "../../utils/localStorage";
import isIE from "../../utils/isIE";
import addNameToTranslation from "../../utils/addNameToTranslation";
import { Area, AreaTypes, AssessmentStatus } from "../../utils/types";

import theme from "../../assets/styles/theme";
import { getSession } from "../../libs/assessment";

interface IAssessementSelectionAreaProps {
  userData: IUserData;
}

const AssessementSelectionArea = ({
  userData,
}: IAssessementSelectionAreaProps): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const { t } = useTranslation();

  const [isStartButtonDisabled, setStartButtonDisabled] = useState(false);
  const [isAssessmentLoading, setAssessmentLoading] = useState(false);
  const [numberOfCompletedAreas, setNumberOfCompletedAreas] = useState(1);
  const [isAssessmentFinished, setAssessmentFinished] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  // If external user ; the new local storage is not empty
  // so replace the current local storage with this new local storage
  replaceUserDataOnLocalStorage(userData);

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<AssessmentStatus>(
    AssessmentStatus.start
  );
  const [areasCompleted, setAreasCompleted] = useState([]);
  const [activeArea, setActiveArea] = useState<AreaTypes>("default");

  const handleCallback = (areaSelected) => {
    setActiveArea(areaSelected);
  };

  const onClick = () => {
    // When user click on start button has to be disabled
    // Avoid multi-click
    setStartButtonDisabled(true);
    setAssessmentLoading(true);

    if (isAssessmentFinished) {
      router.push(`/report/${token}`);
      return;
    }

    addActiveAreaOnLocalStorage(activeArea);
    router.push(`/assessment/${token}`);
  };

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
    setAreasCompleted(getAreasCompletedFromLocalStorage());
  }, []);

  useEffect(() => {
    if (activeArea === "default") setStartButtonDisabled(true);
    else setStartButtonDisabled(false);
  }, [activeArea]);
  useEffect(() => {
    if (areasCompleted?.length === 6)
      // If area not selected or assessment not finished
      setStartButtonDisabled(false);
  }, [areasCompleted]);

  useEffect(() => {
    const lengthOfAreasCompleted = areasCompleted?.length;

    setName(getNameFromLocalStorage());
    setNumberOfCompletedAreas(lengthOfAreasCompleted);
    setAssessmentFinished(numberOfCompletedAreas === 6);

    if (areasCompleted?.length) setStatus(AssessmentStatus.progress);
  });

  return (
    <>
      <Head
        pageURL={t("assessment:url")}
        pageTitle={t("assessment:title")}
        pageDescription={t("assessment:description")}
      />

      <ThemeProvider
        theme={
          activeArea === "default"
            ? theme[Area.peopleWorkforce]
            : theme[activeArea]
        }
      >
        {status === AssessmentStatus.start && <Header />}
        {status === AssessmentStatus.progress && (
          <Header
            isActiveAreaCompleted
            activeArea={activeArea}
            areasCompleted={areasCompleted}
            title={t(
              addNameToTranslation(
                "assessment:selectionArea.headertitle",
                name
              ),
              { name }
            )}
          />
        )}

        <main>
          <Container isVerticallyCentered>
            <Title
              isBold
              asSubtitle={status === AssessmentStatus.progress}
              subtitle={t(`assessment:selectionArea.${status}.subtitle`)}
              title={
                status === AssessmentStatus.progress
                  ? t("assessment:selectionArea.progress.title")
                  : t(
                      addNameToTranslation(
                        `assessment:selectionArea.start.title`,
                        name
                      ),
                      { name }
                    )
              }
              description={
                status === AssessmentStatus.progress &&
                t("assessment:selectionArea.progress.text")
              }
            />

            <AreaSelection parentCallback={handleCallback} status={status} />
            <Actions>
              <div>
                <Button
                  onClick={onClick}
                  isLoading={isAssessmentLoading}
                  isDisabled={isStartButtonDisabled}
                  title={
                    isAssessmentFinished
                      ? t("assessment:selectionArea.buttons.endAssessment")
                      : t("assessment:selectionArea.buttons.start")
                  }
                />
              </div>
            </Actions>
          </Container>
        </main>
      </ThemeProvider>

      <Footer hasLanguageSelector />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { token } = params; // Get the token from the URL

  const { country, group, results } = await getSession(token as string); // Get session data from API

  if (!results) {
    return {
      notFound: true,
    };
  }

  // Transform it to local storage object
  const userData = {
    token,
    country,
    group,
    areasCompleted: results?.map(({ area }) => area),
  };

  return {
    props: {
      userData,
      ...(await serverSideTranslations(locale, ["assessment", "common"])),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { token: "58c89dxf1e" } }],
  fallback: "blocking",
});

export default AssessementSelectionArea;
