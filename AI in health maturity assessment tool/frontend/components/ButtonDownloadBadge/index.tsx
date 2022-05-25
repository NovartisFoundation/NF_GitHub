/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import Icon from "../Icon";

import {
  buttonDownloadBadgeStyles,
  buttonDownloadBadgeTextStyles,
} from "./styles";

import { Area, Level } from "../../utils/types";
import { defaultTextColor } from "../../assets/styles/colors";

interface IButtonDownloadBadge {
  label?: string;
  defaultFilename?: string;
  badges: { area: Area; level: Level }[] | string;
}

function ButtonDownloadBadge({
  label,
  badges,
  defaultFilename,
}: IButtonDownloadBadge): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLang = router.locale;
  const langFolder = `${`/`}${currentLang}`;

  const numberofBadge = badges.length;

  const handleDownloads = () => {
    let filename = "";

    if (!Array.isArray(badges)) {
      saveAs(badges, `${defaultFilename}.jpg`);
      return;
    }

    badges.forEach((b) => {
      switch (b.area) {
        case "peopleWorkforce":
          filename = t("areas.peopleWorkforce");
          break;
        case "dataTechnology":
          filename = t("areas.dataTechnology");
          break;
        case "governanceRegulatory":
          filename = t("areas.governanceRegulatory");
          break;
        case "designProcesses":
          filename = t("areas.designProcesses");
          break;
        case "partnershipStakeholders":
          filename = t("areas.partnershipStakeholders");
          break;
        case "businessModels":
          filename = t("areas.businessModels");
          break;
        default:
          filename = t("areas.peopleWorkforce");
      }
      saveAs(
        `/static/badges${langFolder}/${b.area}-level${b.level}.jpg`,
        `${filename}.jpg`
      );
    });
  };

  const JSZIP = () => {
    let count = 0;
    const zipFilename = `${t("badge.alt")}.zip`;
    const urls = [];

    if (!Array.isArray(badges)) return;

    badges.forEach((b) => {
      urls.push(`/static/badges${langFolder}/${b.area}-level${b.level}.jpg`);
    });

    const zip = new JSZip();
    urls.forEach((url) => {
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err) {
          throw err; // or handle the error
        }
        let filename = t("areas.peopleWorkforce");

        switch (count) {
          case 0:
            filename = t("areas.peopleWorkforce");
            break;
          case 1:
            filename = t("areas.dataTechnology");
            break;
          case 2:
            filename = t("areas.governanceRegulatory");
            break;
          case 3:
            filename = t("areas.designProcesses");
            break;
          case 4:
            filename = t("areas.partnershipStakeholders");
            break;
          case 5:
            filename = t("areas.businessModels");
            break;
          default:
            filename = t("areas.peopleWorkforce");
        }
        zip.file(`${filename}.jpg`, data, { binary: true });
        // eslint-disable-next-line no-plusplus
        count++;
        if (count === urls.length) {
          zip
            .generateAsync({
              type: "blob",
            })
            .then((content) => {
              saveAs(content, zipFilename);
            });
        }
      });
    });
  };

  return (
    <button
      type="button"
      css={buttonDownloadBadgeStyles}
      onClick={() =>
        Array.isArray(badges) && numberofBadge > 1 ? JSZIP() : handleDownloads()
      }
    >
      <Icon icon="download" color={defaultTextColor} size={15} />
      <span css={buttonDownloadBadgeTextStyles}>
        {label || t("buttonDownloadBadge.label")}
      </span>
    </button>
  );
}

export default ButtonDownloadBadge;
