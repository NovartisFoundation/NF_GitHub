import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@emotion/react";

import List from "../../components/List";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import Columns from "../../components/Columns";
import BoxColored from "../../components/BoxColored";

import theme from "../../assets/styles/theme";

import { Area } from "../../utils/types";
import { wrapList } from "../../utils/wrapContent";

interface IAreaRecommendationsModalProps {
  area: Area;
  group: string;
  isOpen: boolean;
  toggleModal: () => void;
}

const AreaRecommendationsModal = ({
  area,
  group,
  isOpen,
  toggleModal,
}: IAreaRecommendationsModalProps): React.ReactElement => {
  const { t } = useTranslation();

  const contentKey = `report:recommandationArea.modal.${area}`;
  const contentGroupKey = `${contentKey}.groups.${group}`;

  return (
    <ThemeProvider theme={theme[area]}>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <Title
          isBold
          asSubtitle
          icon={area}
          color={theme[area].colors.primary}
          title={t(`areas.${area}`)}
        />

        <Columns columns={[60, 40]}>
          <div>
            <p>
              <strong>{t(`${contentKey}.title`)}</strong>
            </p>
            <List isOrdered>
              {wrapList(
                t(`${contentKey}.list`, {
                  returnObjects: true,
                })
              )}
            </List>
          </div>

          <BoxColored title={t(`${contentGroupKey}.title`)}>
            <List>
              {wrapList(t(`${contentGroupKey}.list`, { returnObjects: true }))}
            </List>
          </BoxColored>
        </Columns>
      </Modal>
    </ThemeProvider>
  );
};

export default AreaRecommendationsModal;
