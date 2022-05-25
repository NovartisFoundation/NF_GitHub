/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

import Modal from "../../components/Modal";

import Form from "../../components/Form";
import Button from "../../components/Button";
import FormRow from "../../components/FormRow";
import FormLabel from "../../components/FormLabel";
import { getTokenFromLocalStorage } from "../../utils/localStorage";
import ShareByLink from "../../components/ShareByLink";

type Inputs = {
  email: string;
};

interface IShareModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const ShareModal = ({
  isOpen,
  toggleModal,
}: IShareModalProps): React.ReactElement => {
  const { t } = useTranslation();

  // Still need to have this with our API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theURL, setTheURL] = useState(
    `${process.env.WEBSITE_URL}/report/${getTokenFromLocalStorage()}`
  );

  const contentForEmail = {
    subject: t("report:email.subject"),
    thankYou: t("report:email.thankYou"),
    now: t("report:email.now"),
    see: t("report:email.see"),
    copy: t("report:email.copy"),
    forgot: t("report:email.forgot"),
    comeBack: t("report:email.comeBack"),
    TermsOfUse: t("report:email.TermsOfUse"),
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isSentError, setIsSentError] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setTheURL(window.location.href);
    let timerId;
    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [isSent]);

  async function sendEmail(_theEmail, _theURL, _theContent, reset) {
    setIsSubmitted(true);
    try {
      const res = await fetch(`/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: _theURL,
          email: _theEmail,
          content: _theContent,
        }),
      });
      const data = await res;
      if (data.status === 200) {
        setIsSent(true);
        setTimeout(() => {
          reset();
        }, 2000);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setIsSentError(true);
    }
    setIsSubmitted(false);
  }

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data) => {
    sendEmail(data.email, theURL, contentForEmail, reset);
  };

  const emailInputValue = watch("email");

  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal} isSmall>
      <h4>{t("report:share.title")}</h4>

      <ShareByLink
        url={theURL}
        label={t("report:share.form.shareByLink.label")}
      />

      <hr />

      <Form isSmall onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <FormLabel
            icon="email"
            htmlFor="shareByEmail"
            label={t("report:share.form.shareByEmail.label")}
          >
            <input
              type="text"
              id="shareByEmail"
              placeholder={t("report:share.form.shareByEmail.placeholder")}
              {...register("email", { required: true })}
            />
          </FormLabel>
          <Button
            title={
              !isSent
                ? isSubmitted
                  ? t("report:share.form.shareByEmail.buttons.loading")
                  : t("report:share.form.shareByEmail.buttons.send")
                : t("report:share.form.shareByEmail.buttons.emailSent")
            }
            isSubmit
            isDisabled={!emailInputValue}
          />
        </FormRow>
        <FormRow isError>
          {errors.email && <p>{t("report:share.form.errors.filedRequired")}</p>}
          {isSentError && <p>{t("report:share.form.errors.emailSentError")}</p>}
        </FormRow>
      </Form>
    </Modal>
  );
};

export default ShareModal;
