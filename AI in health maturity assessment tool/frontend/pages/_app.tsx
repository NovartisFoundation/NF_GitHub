import App from "next/app";
import { appWithTranslation } from "next-i18next";

import "../assets/fonts/googleFonts.css";
import globalStyles from "../assets/styles/global";

function MyApp(appProps): React.ReactElement {
  const { Component, pageProps } = appProps;

  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
