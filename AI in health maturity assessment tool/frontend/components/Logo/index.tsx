import { useTranslation } from "next-i18next";

import Styledlogo from "./styles";

interface ILogoProps {
  context?: string;
  hasBaseline?: boolean;
}

const Logo = ({
  context = "default",
  hasBaseline = false,
}: ILogoProps): React.ReactElement => {
  const { t } = useTranslation();

  let url = "/static/logo.svg";

  if (hasBaseline) {
    url = "/static/logo-baseline.svg";
  }

  return <Styledlogo src={url} context={context} alt={t("title")} />;
};

export default Logo;
