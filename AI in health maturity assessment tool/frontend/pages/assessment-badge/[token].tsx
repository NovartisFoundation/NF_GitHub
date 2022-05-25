import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@emotion/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ErrorPage from "../_error";

import Head from "../../components/Head";
import Title from "../../components/Title";
import Badge from "../../components/Badge";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Actions from "../../components/Actions";
import Container from "../../components/Container";
import ShareByLink from "../../components/ShareByLink";
import ButtonDownloadBadge from "../../components/ButtonDownloadBadge";

import {
  IUserData,
  getNameFromLocalStorage,
  getActiveAssessmentOnLocalStorage,
  getAreasCompletedFromLocalStorage,
  replaceUserDataOnLocalStorage,
  getActiveAreaFromLocalStorage,
  getTokenFromLocalStorage,
  resetActiveAssessmentOnLocalStorage,
} from "../../utils/localStorage";
import isIE from "../../utils/isIE";
import { Area, Level, Size } from "../../utils/types";
import addNameToTranslation from "../../utils/addNameToTranslation";

import levels from "../../config/levels";

import theme from "../../assets/styles/theme";

import { fetchQuestions, getSession } from "../../libs/assessment";

interface IAssessementBadgeProps {
  userData: IUserData;
  maxScoreAreas: { area: Area; maxScore: number }[];
}

const AssessementBadge = ({
  userData,
  maxScoreAreas,
}: IAssessementBadgeProps): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const currentLang = router.locale;
  const { t } = useTranslation();

  // If external user ; the new local storage is not empty
  // so replace the current local storage with this new local storage
  replaceUserDataOnLocalStorage(userData);

  if (!getActiveAreaFromLocalStorage()) {
    // If not active area, it means external user arrived on the assessment => Go to selection area
    router.push(`/assessment-selectionArea/${getTokenFromLocalStorage()}`);
    return <Loading />;
  }

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [level, setLevel] = useState<Level>();

  const [areasCompleted, setAreasCompleted] = useState([]);
  const [numberOfCompletedAreas, setNumberOfCompletedAreas] = useState(1);
  const [lastAreaCompleted, setLastAreaCompleted] = useState<Area>();

  const [isAssessmentFinished, setAssessmentFinished] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isLoadingReport, setLoadingReport] = useState(false);

  const onClick = () => {
    if (isAssessmentFinished) {
      setButtonDisabled(true); // Avoid multi-click
      setLoadingReport(true);

      router.push(`/report/${token}`);
      return;
    }

    // Reset active assessment
    resetActiveAssessmentOnLocalStorage();
    if (typeof window !== "undefined") {
      if (currentLang !== "en") {
        window.location.href = `/${currentLang}/assessment-selectionArea/${token}`;
      } else {
        window.location.href = `/assessment-selectionArea/${token}`;
      }
    } else {
      router.push(`/assessment-selectionArea/${token}`);
    }
  };

  const getLevel = () => {
    const maxScoreArea = maxScoreAreas.find(
      ({ area }) => area === getActiveAreaFromLocalStorage()
    ).maxScore;

    const score = (getActiveAssessmentOnLocalStorage() * 100) / maxScoreArea;

    if (score >= levels[3]) return Level.leader;
    if (score >= levels[2]) return Level.emerging;
    return Level.exploring;
  };

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
    setAreasCompleted(getAreasCompletedFromLocalStorage());
  }, []);

  useEffect(() => {
    const lengthOfAreasCompleted = areasCompleted.length;

    setLevel(getLevel());
    setName(getNameFromLocalStorage());
    setNumberOfCompletedAreas(lengthOfAreasCompleted);
    setAssessmentFinished(numberOfCompletedAreas === 6);
    setLastAreaCompleted(areasCompleted[lengthOfAreasCompleted - 1]);
  });

  return (
    <>
      <Head
        pageURL={t("assessment:url")}
        pageTitle={t("assessment:title")}
        pageDescription={t("assessment:description")}
      />

      <ThemeProvider theme={theme[lastAreaCompleted] || theme.default}>
        <Header
          isActiveAreaCompleted
          activeArea={lastAreaCompleted}
          areasCompleted={areasCompleted}
          title={t(
            addNameToTranslation(
              `assessment:badge.badge${numberOfCompletedAreas}.headertitle`,
              name
            ),
            {
              name,
            }
          )}
        />

        <main>
          <Container>
            <Title
              isBold
              asSubtitle
              subtitle={t("assessment:badge.subtitle")}
              title={
                numberOfCompletedAreas > 1
                  ? t("assessment:badge.title_plural", {
                      areasCompleted: numberOfCompletedAreas,
                    })
                  : t("assessment:badge.title", {
                      areasCompleted: numberOfCompletedAreas,
                    })
              }
              description={t("assessment:badge.description")}
            />

            <Badge
              hasLabel
              level={level}
              size={Size.XLarge}
              area={lastAreaCompleted}
            />

            <ButtonDownloadBadge
              badges={[{ area: Area[lastAreaCompleted], level }]}
            />
            <Actions>
              <div>
                <ShareByLink
                  url={`${process.env.WEBSITE_URL}/assessment-selectionArea/${token}`}
                  label={t("assessment:badge.shareByLink.label")}
                />
              </div>
              <div>
                <Button
                  onClick={onClick}
                  isLoading={isLoadingReport}
                  isDisabled={isButtonDisabled}
                  title={
                    isAssessmentFinished
                      ? t("assessment:badge.buttons.endAssessment")
                      : t("assessment:badge.buttons.next")
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

  // Calc the max score for each area
  const maxScoreAreas = (await fetchQuestions()).map((area) => ({
    area: area.slug,
    maxScore:
      area.pillars.reduce(
        // Multiply by 1 to indicates that these are numbers, not strings
        (accumulator, currentValue) =>
          accumulator + currentValue.question.length * 1,
        0
      ) * 10,
  }));

  // Transform it to local storage object
  const userData = {
    token,
    country,
    group,
    areasCompleted: results.map((result) => result.area),
  };

  return {
    props: {
      userData,
      maxScoreAreas,
      ...(await serverSideTranslations(locale, ["assessment", "common"])),
    },
    revalidate: 3,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { token: "58c89dxf1e" } }],
  fallback: "blocking",
});

export default AssessementBadge;
