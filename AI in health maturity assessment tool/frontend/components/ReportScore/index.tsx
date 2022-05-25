/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import theme from "../../assets/styles/theme";

import Box from "../Box";
import Icon from "../Icon";
import ProgressRing from "../ProgressRing";
import ScoreGauge from "../ScoreGauge";
import {
  reportScoreCreditTitleStyle,
  reportScoreHeaderStyle,
  reportScoreHeadingStyle,
  reportScoreCustomizationListStyle,
  reportScoreInvestContainerStyle,
  reportScoreInvestCheckStyle,
  StyledTextInvest,
  reportScoreCreditStyle,
  reportScoreCreditTitleTagStyle,
  investTextStyle,
} from "./styles";

import { Area } from "../../utils/types";
import maxCredits from "../../config/report";

interface IReportScoreProps {
  score: number;
  scoreMax: number;
  scoreDynamic: number;
  setScoreDynamic: (number) => void;
  scoreDynamicAreas: { area: Area; score: number; best?: number }[];
  setScoreDynamicAreas: (any) => void;
  scoreData: { area: Area; score: number; best?: number }[];
  credits: number;
  setCredits: (number) => void;
}

const ReportScore = ({
  score,
  scoreMax,
  scoreDynamic,
  setScoreDynamic,
  scoreDynamicAreas,
  setScoreDynamicAreas,
  credits,
  setCredits,
  scoreData,
}: IReportScoreProps): React.ReactElement => {
  const { t } = useTranslation();

  // Invest
  const [autoInvest, setAutoInvest] = useState(false);

  /* Set the dynamic score total and array */
  const setScoreDynamicAreasState = (area, value) => {
    // Copy the array
    const copy = [...scoreDynamicAreas];
    // Find the object
    const temp = copy.filter((sc) => sc.area === area)[0];

    // Replace the value
    copy[copy.indexOf(temp)].score = value;
    // Set the new array
    setScoreDynamicAreas([...copy]);

    // Update score dynamic total
    let total = 0;
    copy.forEach((c) => {
      total += c.score;
    });
    setScoreDynamic(total);

    // Update invest
    setAutoInvest(false);
  };

  /* Do the changes for the auto invest */
  const onChangeInvest = () => {
    setAutoInvest(!autoInvest);
  };
  useEffect(() => {
    // Reset customized value by the auto proposed
    if (autoInvest) {
      const bestScores = JSON.parse(JSON.stringify(scoreData)).map((area) => {
        // eslint-disable-next-line no-param-reassign
        area.score = area.best;
        return area;
      });
      setScoreDynamicAreas(JSON.parse(JSON.stringify(bestScores)));

      // Calculate credits left + total score
      let tot = 0;
      let c = maxCredits;
      scoreData.forEach((s) => {
        c -= s.best - s.score;
        tot += s.best;
      });
      setCredits(c);
      setScoreDynamic(tot);
    } else {
      setScoreDynamicAreas(JSON.parse(JSON.stringify(scoreData)));
      setCredits(10);
      setScoreDynamic(score);
    }
  }, [autoInvest]);

  return (
    <Box>
      <div css={reportScoreHeaderStyle}>
        <ProgressRing
          scoreMax={scoreMax}
          score={score}
          scoreDynamic={scoreDynamic}
        />
        <div css={reportScoreHeadingStyle}>
          <h4>{t("report:scoreArea.title")}</h4>
        </div>
      </div>

      <div>
        <h5>{t("report:scoreArea.subtitle")}</h5>

        <ul css={reportScoreCustomizationListStyle}>
          {scoreData.map((s, index) => (
            <li key={index.toString()}>
              <ScoreGauge
                color={theme[`${s.area}`].colors.primary}
                score={s.score}
                areaSlug={s.area}
                scoreDynamic={
                  scoreDynamicAreas.filter((sc) => sc.area === s.area)[0].score
                }
                setScoreDynamic={setScoreDynamicAreasState}
                credits={credits}
                setCredits={setCredits}
              />
            </li>
          ))}
        </ul>
      </div>

      <div css={reportScoreCreditStyle}>
        <div css={reportScoreCreditTitleStyle}>
          <Icon icon="money" color="#000000" />
          <h5
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: t("report:scoreArea.popup.invest.title"),
            }}
            css={reportScoreCreditTitleTagStyle}
          />
        </div>
        <div css={reportScoreInvestContainerStyle}>
          <StyledTextInvest autoInvest={autoInvest}>
            {t("report:scoreArea.investSwitch.personal")}
          </StyledTextInvest>
          <input
            css={reportScoreInvestCheckStyle}
            type="checkbox"
            onChange={onChangeInvest}
            checked={autoInvest}
          />
          <StyledTextInvest autoInvest={autoInvest} autoText>
            {t("report:scoreArea.investSwitch.auto")}{" "}
          </StyledTextInvest>
        </div>
        <div css={investTextStyle}>
          <p>
            {t("report:scoreArea.popup.invest.text", {
              returnObjects: true,
            })}
          </p>
        </div>
      </div>
    </Box>
  );
};

export default ReportScore;
