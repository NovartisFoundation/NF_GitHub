/** @jsxImportSource @emotion/react */

import Image from "next/image";

import Container from "../Container";
import LanguageSelector from "../LanguageSelector";

import { footerStyle, footerLogoStyle } from "./styles";

interface IFooterProps {
  hasLanguageSelector?: boolean;
}

const Footer = ({
  hasLanguageSelector = false,
}: IFooterProps): React.ReactElement => (
  <footer css={footerStyle}>
    <Container hasColumns>
      {hasLanguageSelector && <LanguageSelector isInversed />}
      <div css={footerLogoStyle}>
        <Image src="/static/broadband-logo.png" width={180} height={30} />
        <Image src="/static/logo-baseline.svg" width={130} height={15} />
      </div>
    </Container>
  </footer>
);

export default Footer;
