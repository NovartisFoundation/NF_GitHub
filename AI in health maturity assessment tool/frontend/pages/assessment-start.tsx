import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ErrorPage from "./_error";

import Head from "../components/Head";
import Form from "../components/Form";
import Title from "../components/Title";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FormRow from "../components/FormRow";
import Actions from "../components/Actions";
import Container from "../components/Container";
import FormLabel from "../components/FormLabel";
import FormSelect from "../components/FormSelect";

import isIE from "../utils/isIE";
import { addUserDataOnLocalStorage } from "../utils/localStorage";

import countryOptions from "../config/countryOptions";
import stakeholderGroupOptions from "../config/stakeholderGroupOptions";
import { initSession } from "../libs/assessment";

const AssessementStart = (): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();

  const [isFormValid, setFormValid] = useState(false);

  const inputNameRef = useRef<HTMLInputElement>();
  const inputRoleRef = useRef<HTMLInputElement>();
  const [countryValue, setCountryValue] = useState();
  const [isAssessmentLoading, setAssessmentLoading] = useState(false);
  const [stakeholderGroupValue, setStakeholderGroupValue] = useState();
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const onClick = async () => {
    setAssessmentLoading(true);
    setSubmitButtonDisabled(true);

    // Init the session in the API
    const token = await initSession(
      countryValue,
      stakeholderGroupValue,
      inputRoleRef.current.value
    );

    const data = {
      name: inputNameRef.current.value,
      role: inputRoleRef.current.value,
      country: countryValue,
      group: stakeholderGroupValue,
      token,
    };

    addUserDataOnLocalStorage(data);

    router.push(`/assessment-selectionArea/${token}`);
  };

  useEffect(() => {
    if (countryValue && stakeholderGroupValue) setFormValid(true);
  });

  useEffect(() => {
    if (isFormValid) setSubmitButtonDisabled(false);
  }, [isFormValid]);

  return (
    <>
      <Head
        pageURL={t("assessment:url")}
        pageTitle={t("assessment:title")}
        pageDescription={t("assessment:description")}
      />

      <main>
        <Container isVerticallyCentered>
          <Title
            isBold
            subtitle={t("assessment:start.subtitle")}
            title={t("assessment:start.title")}
          />

          <Form>
            <FormRow>
              <FormLabel htmlFor="name" icon="person">
                <input
                  id="name"
                  type="text"
                  ref={inputNameRef}
                  placeholder={t("assessment:start.form.name.placeholder")}
                />
              </FormLabel>
              <FormLabel htmlFor="role" icon="case">
                <input
                  id="role"
                  type="text"
                  ref={inputRoleRef}
                  placeholder={t("assessment:start.form.role.placeholder")}
                />
              </FormLabel>
            </FormRow>

            <FormRow>
              <FormLabel htmlFor="country" icon="flag">
                <FormSelect
                  id="country"
                  options={countryOptions[locale]}
                  onChange={({ value }) => setCountryValue(value)}
                  placeholder={t("assessment:start.form.country.placeholder")}
                />
              </FormLabel>
              <FormLabel htmlFor="stakeholderGroup" icon="group">
                <FormSelect
                  isSearchable={false}
                  id="stakeholderGroup"
                  onChange={({ value }) => setStakeholderGroupValue(value)}
                  options={stakeholderGroupOptions.map((option) => ({
                    value: option,
                    label: t(`common:groups.${option}`),
                  }))}
                  placeholder={t(
                    "assessment:start.form.stakeholderGroup.placeholder"
                  )}
                />
              </FormLabel>
            </FormRow>
          </Form>
          <Actions>
            <div>
              <p>{t("assessment:start.legal")}</p>
            </div>
            <div>
              <Button
                onClick={onClick}
                isLoading={isAssessmentLoading}
                isDisabled={isSubmitButtonDisabled}
                title={t("assessment:start.buttons.selectArea")}
              />
              <p>{t("assessment:start.buttons.selectAreaHelper")}</p>
            </div>
          </Actions>
        </Container>
      </main>

      <Footer hasLanguageSelector />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["assessment", "common"])),
  },
  revalidate: 20,
});

export default AssessementStart;
