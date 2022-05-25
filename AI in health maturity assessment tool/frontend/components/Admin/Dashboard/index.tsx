/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { grey } from "../../../assets/styles/colors";
import { AdminStatistics, Session } from "../../../utils/types";
import Container from "../../Container";
import Icon from "../../Icon";
import FormRow from "../../FormRow";
import FormLabel from "../../FormLabel";
import FormSelect, { OptionType } from "../../FormSelect";

import countryOptions from "../../../config/countryOptions";
import { fetchStats } from "../../../libs/admin";
import Loading from "../../Loading";
import { adminLanguage } from "../../../config/admin";
import AdminOverview from "../Overview";
import AdminAreaAverage from "../AreaAverage";
import AdminTable from "../Table";
import {
  adminHeaderStyle,
  adminTitleStyle,
  StyledSessionPopupContainer,
} from "./styles";
import {
  addAuthDataOnLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "../../../utils/localStorage";
import PopUp from "../../PopUp";
import { refreshToken } from "../../../libs/auth";

interface IAdminDashboardProps {
  stats: AdminStatistics;
  dataTable: Session[];
}

const AdminDashboard = ({
  dataTable,
  stats,
}: IAdminDashboardProps): React.ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSessionPopupOpen, setIsSessionPopupOpen] = useState(false); // Popup used to say if the session is expired
  const [country, setCountry] = useState("");
  const [statistics, setStatistics] = useState(stats);
  const [totalAverage, setTotalAverage] = useState(
    stats.area_average.reduce(
      // Multiply by 1 to indicates that these are numbers, not strings
      (accumulator, currentValue) => accumulator + currentValue.total * 1,
      0
    ) / stats.area_average.length
  );
  // State for popup info
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    setStatistics(stats);
    setTotalAverage(
      stats.area_average.reduce(
        // Multiply by 1 to indicates that these are numbers, not strings
        (accumulator, currentValue) => accumulator + currentValue.total * 1,
        0
      ) / stats.area_average.length
    );
  }, [stats]);

  useEffect(() => {
    const average =
      statistics.area_average.reduce(
        // Multiply by 1 to indicates that these are numbers, not strings
        (accumulator, currentValue) => accumulator + currentValue.total * 1,
        0
      ) / statistics.area_average.length;

    // eslint-disable-next-line no-restricted-globals
    setTotalAverage(isNaN(average) ? 0 : average);
  }, [statistics]);

  // Table country select
  // This is a custom filter UI for selecting
  // a unique option from a list
  const SelectColumnFilter = ({
    column: { setFilter, preFilteredRows, id },
  }) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
      const opt = new Set();
      opt.add("All");
      preFilteredRows.forEach((row) => {
        opt.add(row.values[id]);
      });
      return [...opt.values()].map((option) => ({
        label: option,
        value: option === "All" ? "" : option,
      }));
    }, [id, preFilteredRows]) as OptionType[];

    const onChangeCountryFilter = async (e) => {
      const value =
        countryOptions[adminLanguage].find(({ label }) => label === e.value)
          ?.value ?? "";

      setIsLoading(true);

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

        await fetchStats(getAccessTokenFromLocalStorage(), value)
          .then((results) => setStatistics(results))
          .catch(() => {
            setIsSessionPopupOpen(true);

            setTimeout(() => router.push("/admin/login"), 2000);
          });
        setCountry(e.value);
        setFilter(e.value || undefined);
        setIsLoading(false);
      } else {
        setIsSessionPopupOpen(true);

        setTimeout(() => router.push("/admin/login"), 2000);
      }
    };

    // Render a multi-select box
    return (
      <FormRow>
        <FormLabel htmlFor="country" icon="flag">
          <FormSelect
            id="country"
            options={options}
            onChange={(e) => onChangeCountryFilter(e)}
            placeholder={options[0].label}
          />
        </FormLabel>
      </FormRow>
    );
  };

  return (
    <Container>
      <div css={adminHeaderStyle}>
        <h1 css={adminTitleStyle}>
          <Icon icon="dashboard" color={grey} />
          <span>{t("admin:dashboardOverview.title")}</span>
        </h1>
      </div>

      <hr />

      <AdminOverview
        statistics={statistics}
        country={country}
        totalAverage={totalAverage}
      />

      <AdminAreaAverage statistics={statistics} />

      <AdminTable
        dataTable={dataTable}
        isPopupOpen={isPopupOpen}
        handleClick={handleClick}
        selectColumnFilter={SelectColumnFilter}
      />

      <Loading isVisible={isLoading} />
      <StyledSessionPopupContainer isOpen={isSessionPopupOpen}>
        <PopUp
          isOpen={isSessionPopupOpen}
          togglePopUp={setIsSessionPopupOpen}
          title={t("admin:session.redirection.title")}
          text={[t("admin:session.redirection.text")]}
          hasCloseButton={false}
          top={50}
          left={50}
        />
      </StyledSessionPopupContainer>
    </Container>
  );
};

export default AdminDashboard;
