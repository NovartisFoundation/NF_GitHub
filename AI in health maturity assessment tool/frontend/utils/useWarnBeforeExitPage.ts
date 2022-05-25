import Router from "next/router";
import { useEffect } from "react";

const useWarnBeforeExitPage = (
  shouldPreventRouteChange: boolean,
  message: string
): void => {
  useEffect(() => {
    const routeChangeStart = (url) => {
      const currentUrl =
        Router.locale !== Router.defaultLocale
          ? `/${Router.locale}${Router.asPath}`
          : Router.asPath;

      if (currentUrl !== url && shouldPreventRouteChange) {
        // eslint-disable-next-line no-alert
        if (!window.confirm(message)) {
          Router.events.emit("routeChangeError");
          Router.push(Router.asPath, undefined, { shallow: true });

          const error = "Abort route change. Please ignore this error.";
          throw error;
        }
      }
    };

    const beforeunload = (e) => {
      if (shouldPreventRouteChange) {
        e.preventDefault();
        e.returnValue = true;
      }
    };

    window.addEventListener("beforeunload", beforeunload);
    Router.events.on("beforeHistoryChange", routeChangeStart);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      Router.events.off("beforeHistoryChange", routeChangeStart);
    };
  }, [shouldPreventRouteChange]);
};

export default useWarnBeforeExitPage;
