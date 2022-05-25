/** @jsxImportSource @emotion/react */
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

import Icon from "../Icon";

import {
  StyledLanguageSelector,
  languageSelectorButtonStyles,
  StyledLanguageSelectorIcon,
  StyledLanguageSelectorList,
  languageSelectorListItemStyles,
  StyledLanguageSelectorListItemLink,
} from "./styles";
import { getTokenFromLocalStorage } from "../../utils/localStorage";

interface ILanguageSelectorProps {
  isInversed?: boolean;
}

const LanguageSelector = ({
  isInversed,
}: ILanguageSelectorProps): React.ReactElement => {
  const { t } = useTranslation();
  const { locales, locale, route } = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const LanguageSelectorRef = useRef<HTMLInputElement>();

  const toggleLanguageSelector = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (!LanguageSelectorRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const generateHref = () => {
    const pathname = { pathname: route };

    if (token) {
      return {
        ...pathname,
        query: { token },
      };
    }

    return pathname;
  };

  useEffect(() => {
    if (route !== "/" && route !== "/assessment-start")
      setToken(getTokenFromLocalStorage());
  }, []);

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={LanguageSelectorRef}>
      <StyledLanguageSelector isInversed={isInversed}>
        <button
          type="button"
          onClick={toggleLanguageSelector}
          css={languageSelectorButtonStyles}
        >
          {t(`common:languageSelector.${locale}`)}
          <StyledLanguageSelectorIcon isOpen={isOpen}>
            <Icon icon="expand_more" color="black" size={15} />
          </StyledLanguageSelectorIcon>
        </button>
        <StyledLanguageSelectorList isOpen={isOpen} isInversed={isInversed}>
          {locales.map((lang) => (
            <li key={lang} css={languageSelectorListItemStyles}>
              <Link href={generateHref()} locale={lang}>
                <StyledLanguageSelectorListItemLink
                  isDisabled={locale === lang}
                >
                  {t(`common:languageSelector.${lang}`)}
                </StyledLanguageSelectorListItemLink>
              </Link>
            </li>
          ))}
        </StyledLanguageSelectorList>
      </StyledLanguageSelector>
    </div>
  );
};

export default LanguageSelector;
