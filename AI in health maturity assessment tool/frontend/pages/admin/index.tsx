import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrorPage from "../_error";

import Head from "../../components/Head";
import Footer from "../../components/Footer";
import ScrollTop from "../../components/ScrollTop";
import HeaderAdmin from "../../components/HeaderAdmin";
import AdminDashboard from "../../components/Admin/Dashboard";

import { fetchSessions, fetchStats } from "../../libs/admin";

import isIE from "../../utils/isIE";

import { adminLanguage } from "../../config/admin";
import countryOptions from "../../config/countryOptions";
import Loading from "../../components/Loading";
import { refreshToken } from "../../libs/auth";
import {
  addAuthDataOnLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "../../utils/localStorage";
import { AdminStatistics } from "../../utils/types";

const Admin = (): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();

  // Static values
  const [stats, setStats] = useState({
    total_participants: 0,
    best: 0,
    worst: 0,
    countries: { total: 0, top: [] },
    topology: [],
    area_average: [],
    complete_assessment_pourcent: { pourcent: 0, number: 0 },
    uncomplete_assessment_pourcent: { pourcent: 0, number: 0 },
  } as AdminStatistics);
  const [rows, setRows] = useState([]);

  // Hide ui while loading admin data
  const [isDataLoading, setIsDataLoading] = useState(true);
  // Progress bar loading status
  const [loadingStatus, setLoadingStatus] = useState(0);
  const [loadingStatusMessage, setLoadingStatusMessage] = useState(
    "Loading Overview Statistics..."
  );

  const { t } = useTranslation();

  const dataTable = rows.map((row) => ({
    ...row,
    country: countryOptions[adminLanguage].find(
      ({ value }) => value === row.country
    ).label,
    group: t(`common:groups.${row.group}`),
    isFinished: row.results.find(({ score }) => score === 0) ? "No" : "Yes",
  }));

  // Load data
  useEffect(() => {
    // Because not recommended to have useEffect as an async function
    const getData = async () => {
      // Refresh the access token with refresh token stored in local storage
      const { data, success } = await refreshToken(
        getRefreshTokenFromLocalStorage()
      );

      // If success, then user authorized
      if (success) {
        // eslint-disable-next-line camelcase
        const { access_token, refresh_token } = data;

        // Save the new tokens
        addAuthDataOnLocalStorage({
          accessToken: access_token,
          refreshToken: refresh_token,
        });

        await fetchStats(access_token).then((result) => {
          const statsFetch = result;
          setStats(statsFetch as AdminStatistics);

          setLoadingStatus(1);
          setLoadingStatusMessage("Loading Sessions...");
        });
        await fetchSessions(access_token).then((result) => {
          setRows(result.rows);

          setLoadingStatus(2);
          setTimeout(() => setIsDataLoading(false), 700);
        });
      }
      // Otherwise, let's go to login
      else {
        router.push("/admin/login");
      }
    };

    getData();
  }, []);

  return (
    <>
      <Head
        pageURL={t("admin:url")}
        pageTitle={t("admin:title")}
        pageDescription={t("admin:description")}
      />

      <HeaderAdmin dataTable={dataTable} />

      <main>
        <AdminDashboard dataTable={dataTable} stats={stats} />
        <Loading
          isTransparent={false}
          isVisible={isDataLoading}
          hasProgressBar
          totalStatusProgressBar={2}
          statusProgressBar={loadingStatus}
          statusProgressBarMessage={loadingStatusMessage}
        />
      </main>

      <ScrollTop />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["admin", "common"])),
  },
});

export default Admin;
