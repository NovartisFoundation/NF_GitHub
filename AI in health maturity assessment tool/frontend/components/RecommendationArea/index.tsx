/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import { green, red } from "../../assets/styles/colors";
import theme from "../../assets/styles/theme";
import { getGroupFromLocalStorage } from "../../utils/localStorage";
import { Area, SessionResults } from "../../utils/types";
import Icon from "../Icon";
import {
  recommandationCardButtonStyle,
  recommandationScoreStyle,
  recommendationCardContainerStyle,
  recommendationCardFooter,
  recommendationCardHeaderStyle,
  recommendationCardListStyle,
  recommendationTitleStyle,
  StyledRecommendationCardTitle,
  StyledScore,
} from "./styles";
import AreaRecommendationsModal from "../../pages/modals/area-recommendations";
import stakeholderGroupOptions from "../../config/stakeholderGroupOptions";

interface IUserRecommendationAreaProps {
  // eslint-disable-next-line camelcase
  scoreData: SessionResults[];
}
const RecommendationArea = ({
  scoreData,
}: IUserRecommendationAreaProps): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const group = getGroupFromLocalStorage();
  const [
    isModalAreaRecommendationsOpen,
    setModalAreaRecommendationsOpen,
  ] = useState(false);
  const [modalArea, setModalArea] = useState(Area.peopleWorkforce);
  const [modalGroup, setModalGroup] = useState(stakeholderGroupOptions[0]);

  const toggleModalAreaRecommendations = () => {
    setModalAreaRecommendationsOpen(!isModalAreaRecommendationsOpen);
  };

  const handleClickButtonCard = (area) => {
    setModalArea(area);
    setModalGroup(group);
    setModalAreaRecommendationsOpen(true);
  };

  return (
    <section>
      <h3 css={recommendationTitleStyle}>
        {t("report:recommandationArea.title")}
      </h3>

      <ul css={recommendationCardListStyle}>
        {scoreData.map(({ pillars, area, score }, index) => (
          <li
            css={recommendationCardContainerStyle}
            key={`area-recommandation-card-${index.toString()}`}
          >
            <div css={recommendationCardHeaderStyle}>
              <Icon icon={area} color={theme[`${area}`].colors.primary} />
              <StyledRecommendationCardTitle
                color={theme[`${area}`].colors.primary}
              >
                {t(`areas.${area}`)}
              </StyledRecommendationCardTitle>

              <button
                css={recommandationCardButtonStyle}
                type="button"
                onClick={() => handleClickButtonCard(Area[area])}
              >
                <Icon
                  icon="plus"
                  size={15}
                  color={theme[`${area}`].colors.primary}
                />
              </button>
            </div>
            <div css={recommandationScoreStyle}>
              <StyledScore color={theme[`${area}`].colors.primary}>
                {score}
              </StyledScore>
              /10
            </div>
            <div css={recommendationCardFooter}>
              <div>
                <strong>
                  {t("report:recommandationArea.strongest")}
                  <Icon icon="thumbUp" color={green} size={15} />
                </strong>
                {pillars.length > 0 && (
                  <p>
                    {
                      pillars.reduce((prev, curr) =>
                        prev.score > curr.score ? prev : curr
                      ).title[locale]
                    }
                  </p>
                )}
              </div>
              <div>
                <strong>
                  {t("report:recommandationArea.opportunity")}
                  <Icon icon="thumbDown" color={red} size={15} />
                </strong>
                {pillars.length > 0 && (
                  <p>
                    {
                      pillars.reduce((prev, curr) =>
                        prev.score < curr.score ? prev : curr
                      ).title[locale]
                    }
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <AreaRecommendationsModal
        area={modalArea}
        group={modalGroup}
        isOpen={isModalAreaRecommendationsOpen}
        toggleModal={toggleModalAreaRecommendations}
      />
    </section>
  );
};

export default RecommendationArea;
