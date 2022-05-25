/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Label from "./Label";

import StyledBadge from "./styles";

import { Area, Level, Size } from "../../utils/types";

interface IBadgeProps {
  area: Area;
  size?: Size;
  level: Level;
  hasLabel?: boolean;
  disabled?: boolean;
}

const Badge = ({
  area,
  level,
  hasLabel = false,
  size = Size.Medium,
  disabled = false,
}: IBadgeProps): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLang = router.locale;
  const langFolder = `${`/`}${currentLang}`;
  return (
    <>
      <StyledBadge disabled={disabled} size={size}>
        <Image
          layout="fill"
          alt={t("badge.alt")}
          unoptimized
          src={`/static/badges${
            hasLabel ? langFolder : ""
          }/${area}-level${level}.jpg`}
        />
      </StyledBadge>

      {/* {hasLabel && <Label level={level} />} */}
    </>
  );
};

export default Badge;
