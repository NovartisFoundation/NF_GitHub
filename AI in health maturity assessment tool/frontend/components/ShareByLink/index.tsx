/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Form from "../Form";
import Button from "../Button";
import FormRow from "../FormRow";
import FormLabel from "../FormLabel";

import shareByLinkInput from "./styles";

interface IActionsProps {
  url: string;
  label?: string;
}

const ShareByLink = ({ url, label }: IActionsProps): React.ReactElement => {
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timerId;
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [isCopied]);

  return (
    <Form isSmall>
      <FormRow>
        <FormLabel htmlFor="shareByLink" label={label}>
          <input
            readOnly
            type="text"
            value={url}
            id="shareByLink"
            css={shareByLinkInput}
          />
        </FormLabel>
        <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
          <Button
            title={
              isCopied
                ? t("shareByLink.buttons.linkCopied")
                : t("shareByLink.buttons.copyLink")
            }
          />
        </CopyToClipboard>
      </FormRow>
    </Form>
  );
};

export default ShareByLink;
