import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ErrorPage from "../_error";

import Logo from "../../components/Logo";
import Head from "../../components/Head";
import Form from "../../components/Form";
import Button from "../../components/Button";
import Actions from "../../components/Actions";
import FormRow from "../../components/FormRow";
import Container from "../../components/Container";
import FormLabel from "../../components/FormLabel";

import isIE from "../../utils/isIE";
import { accessToken } from "../../libs/auth";
import { addAuthDataOnLocalStorage } from "../../utils/localStorage";

const Login = (): React.ReactElement => {
  if (isIE()) return <ErrorPage isIE />;

  const router = useRouter();
  const { t } = useTranslation();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isAdminLoading, setAdminLoading] = useState(false);
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const inputUserNameRef = useRef<HTMLInputElement>();
  const inputPasswordRef = useRef<HTMLInputElement>();

  const onClick = async () => {
    if (usernameValue.length > 0 && passwordValue.length > 0) {
      setAdminLoading(true);
      setSubmitButtonDisabled(true); // Avoid multi-click

      const { data, success } = await accessToken(usernameValue, passwordValue);

      if (success) {
        addAuthDataOnLocalStorage({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });

        router.push("/admin");
      } else {
        setAdminLoading(false);
        setSubmitButtonDisabled(false);

        setErrorMessage(t("login:errors.incorrect"));
      }
    } else {
      setErrorMessage(t("login:errors.mandatory"));
    }
  };

  return (
    <>
      <Head
        pageURL={t("login:url")}
        pageTitle={t("login:title")}
        pageDescription={t("login:description")}
      />

      <main>
        <Container isVerticallyCentered isSmall>
          <Logo context="login" hasBaseline />

          <Form isSmall>
            <FormRow>
              <FormLabel htmlFor="username" icon="person">
                <input
                  id="username"
                  type="text"
                  ref={inputUserNameRef}
                  placeholder={t("login:form.username")}
                  onChange={({ target }) => setUsernameValue(target.value)}
                />
              </FormLabel>
            </FormRow>

            <FormRow>
              <FormLabel htmlFor="password">
                <input
                  id="password"
                  type="password"
                  ref={inputPasswordRef}
                  placeholder={t("login:form.password")}
                  onChange={({ target }) => setPasswordValue(target.value)}
                />
              </FormLabel>
            </FormRow>
          </Form>

          {errorMessage !== "" && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}

          <Actions>
            <div>
              <Button
                onClick={onClick}
                isLoading={isAdminLoading}
                title={t("login:form.buttons.submit")}
                isDisabled={isSubmitButtonDisabled}
              />
            </div>
          </Actions>
          <p
            style={{
              width: "50%",
              textAlign: "right",
              marginTop: 20,
              marginLeft: "auto",
            }}
          >
            Forgot password? Send a mail to{" "}
            <a href="mailto:info@itsnemesis.com">info@itsnemesis.com</a>
          </p>
        </Container>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["login", "common"])),
  },
});

export default Login;
