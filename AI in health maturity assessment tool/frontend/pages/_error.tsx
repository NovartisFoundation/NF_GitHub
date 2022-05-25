import Head from "../components/Head";
import Title from "../components/Title";
import Section from "../components/Section";
import SectionText from "../components/SectionText";

import { Align } from "../utils/types";

interface IErrorProps {
  isIE?: boolean;
  statusCode?: number;
}

const Error = ({ statusCode, isIE }: IErrorProps): React.ReactElement => {
  let errorMessage = `An error ${statusCode} occurred on server`;

  if (isIE)
    errorMessage =
      "It's looks like you may be using a web browser version that we don't support. Make sure you're using the most recent version of your browser, or try using an other supported browser, to get the full website experience.";

  return (
    <>
      <Head
        pageURL="https://yourdomain.com"
        pageTitle="Novartis Foundation"
        pageDescription="Error Page"
      />

      <Section align={Align.Center}>
        {isIE && <Title title="Browser not supported" />}

        <SectionText size={40}>
          <p>{errorMessage}</p>
        </SectionText>
      </Section>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
