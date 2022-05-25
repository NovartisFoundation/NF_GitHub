import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";
import ErrorPage from "../_error";
import ShareModal from "../modals/share";

import Head from "../../components/Head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import ScrollTop from "../../components/ScrollTop";
import UserReport from "../../components/UserReport";
import Loading from "../../components/Loading";
import Button from "../../components/Button";

import isIE from "../../utils/isIE";
import { Area, SessionResults, Position } from "../../utils/types";
import { fetchQuestions, getSession } from "../../libs/assessment";
import {
  getNameFromLocalStorage,
  getTokenFromLocalStorage,
  IUserData,
  replaceUserDataOnLocalStorage,
} from "../../utils/localStorage";
import maxCredits from "../../config/report";

interface IReportProps {
  userData: IUserData;
  results: SessionResults[];
}

const Report = ({ userData, results }: IReportProps): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const { t } = useTranslation();

  // If external user ; the new local storage is not empty
  // so replace the current local storage with this new local storage
  replaceUserDataOnLocalStorage(userData);

  const [name, setName] = useState("");
  const [isModalShareOpen, setModalShareOpen] = useState(false);

  const toggleModalShare = () => {
    setModalShareOpen(!isModalShareOpen);
  };

  useEffect(() => {
    setName(getNameFromLocalStorage());

    if (results.length < 6) {
      router.push(`/assessment-selectionArea/${getTokenFromLocalStorage()}`);
    }
  }, []);

  if (results.length < 6) {
    return <Loading />;
  }
  return (
    <>
      <Head
        pageURL={t("report:url")}
        pageTitle={t("report:title")}
        pageDescription={t("report:description")}
      />

      <Header
        isActiveAreaCompleted
        areasCompleted={[
          Area.peopleWorkforce,
          Area.dataTechnology,
          Area.businessModels,
          Area.designProcesses,
          Area.governanceRegulatory,
          Area.partnershipStakeholders,
        ]}
        toggleModalShare={toggleModalShare}
        title={t(`report:header.heading`, {
          name,
        })}
      />

      <main>
        <Container>
          <UserReport scoreData={results} />
        </Container>
      </main>
      <Container isCentered>
        <Button
          icon="share"
          isInverted
          iconSide={Position.Left}
          onClick={toggleModalShare}
          title={t("report:header.shareButton")}
        />
      </Container>

      <Container isCentered>
        <p
          style={{
            marginTop: 50,
            fontSize: 12,
            fontStyle: "italic",
            marginLeft: "10%",
            marginRight: "10%",
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: t("report:footer"),
          }}
        />
      </Container>

      <ShareModal toggleModal={toggleModalShare} isOpen={isModalShareOpen} />

      <ScrollTop />
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
    areasCompleted: results.map((result) => result.area),
  };

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

  // Get results from the session and format it
  let resultsFormatted = results.map(({ area, score, pillars }) => ({
    area,
    score: Math.round(
      (score * 10) / maxScoreAreas.find((a) => a.area === area).maxScore
    ),
    best: Math.round(
      (score * 10) / maxScoreAreas.find((a) => a.area === area).maxScore
    ),
    pillars,
  }));

  // Optimised score
  let creditTemp = maxCredits;
  for (let i = 1; i < 10 && creditTemp >= 0; i += 1) {
    // eslint-disable-next-line no-loop-func
    resultsFormatted = resultsFormatted.map((r) => {
      if (r.best === i) creditTemp -= 1;

      return {
        area: r.area,
        score: r.score,
        best: r.best === i && creditTemp >= 0 ? r.best + 1 : r.best,
        pillars: r.pillars,
      };
    });
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["report", "common"])),
      userData,
      results: resultsFormatted,
    },
    revalidate: 3,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { token: "58c89dxf1e" } }],
  fallback: "blocking",
});

export default Report;
