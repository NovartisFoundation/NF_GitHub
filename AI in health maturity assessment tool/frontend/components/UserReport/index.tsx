/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import Title from "../Title";
import Columns from "../Columns";
import BadgeList from "../BadgeList";
import ScoreChart from "../ScoreChart";
import ReportScore from "../ReportScore";
import CompletionBadge from "../CompletionBadge";
import RecommendationArea from "../RecommendationArea";

import {
  userReportCol1tyle,
  userReportCol2tyle,
  userReportBadgeList,
} from "./styles";

import { SessionResults } from "../../utils/types";
import { isMobile } from "../../utils/windowWidth";
import maxCredits from "../../config/report";

interface IUserReportProps {
  scoreData: SessionResults[];
}

const UserReport = ({ scoreData }: IUserReportProps): React.ReactElement => {
  const { t } = useTranslation();

  const [isWindowWidthMobile, setWindowWidthMobile] = useState(true);

  // Global score
  const scoreMax = 60;
  const [score] = useState(
    scoreData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.score * 1,
      0
    )
  );

  // Credits
  const [credits, setCredits] = useState(maxCredits);

  const [scoreDynamic, setScoreDynamic] = useState(score); // Score total dynamic
  const [scoreDynamicAreas, setScoreDynamicAreas] = useState(
    JSON.parse(JSON.stringify(scoreData))
  ); // Score dynamic of every area

  useEffect(() => {
    setWindowWidthMobile(isMobile());

    window.addEventListener("resize", () => setWindowWidthMobile(isMobile()));

    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidthMobile(isMobile())
      );
    };
  });

  const badgeListComponent = <BadgeList data={scoreData} />;
  const completionBadgeComponent = <CompletionBadge />;

  return (
    <>
      <Columns columns={[55, 45]}>
        <div css={userReportCol1tyle}>
          <Title
            isBold
            asSubtitle
            title={t("report:header.title")}
            description={t("report:header.description")}
          />
          <ScoreChart
            scoreData={scoreData}
            scoreDynamic={scoreDynamicAreas}
            isDynamicVisible={scoreDynamic > score}
          />
          {!isWindowWidthMobile && (
            <>
              {completionBadgeComponent}
              {badgeListComponent}
            </>
          )}
        </div>

        <div css={userReportCol2tyle}>
          <ReportScore
            score={score}
            scoreMax={scoreMax}
            scoreDynamic={scoreDynamic}
            setScoreDynamic={setScoreDynamic}
            scoreDynamicAreas={scoreDynamicAreas}
            setScoreDynamicAreas={setScoreDynamicAreas}
            scoreData={scoreData}
            credits={credits}
            setCredits={setCredits}
          />
        </div>
      </Columns>

      {isWindowWidthMobile && (
        <>
          {completionBadgeComponent}
          <div css={userReportBadgeList}>{badgeListComponent}</div>
        </>
      )}

      <RecommendationArea scoreData={scoreData} />
    </>
  );
};

export default UserReport;
