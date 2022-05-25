/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line import/prefer-default-export
export const theEmail = (url, content) => {
  const mail = `
    <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <!-- NAME: FOLLOW UP -->
          <!--[if gte mso 15]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${content.thankYou}</title>
          
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i,900,900i" />
          <style>
              img {
                  -ms-interpolation-mode: bicubic;
              }
              table,
              td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }
              .mceButton,
              .mceButton td,
              .mceButton td a {
                  mso-hide: all !important;
              }
              p,
              a,
              li,
              td,
              blockquote {
                  mso-line-height-rule: exactly;
              }
              p,
              a,
              li,
              td,
              body,
              table,
              blockquote {
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%;
              }
              @media only screen and (max-width: 480px) {
                  body,
                  table,
                  td,
                  p,
                  a,
                  li,
                  blockquote {
                      -webkit-text-size-adjust: none !important;
                  }
              }
              .mcnPreviewText {
                  display: none !important;
              }
              .bodyCell {
                  margin: 0 auto;
                  padding: 0;
                  width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass td,
              .ExternalClass div,
              .ExternalClass span,
              .ExternalClass font {
                  line-height: 100%;
              }
              .ReadMsgBody {
                  width: 100%;
              }
              .ExternalClass {
                  width: 100%;
              }
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
              }
              body {
                  height: 100%;
                  margin: 0px;
                  padding: 0px;
                  width: 100%;
                  background: rgb(255, 255, 255);
              }
              p {
                  margin: 0px;
                  padding: 0px;
              }
              td,
              p,
              a {
                  word-break: break-word;
              }
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                  display: block;
                  margin: 0px;
                  padding: 0px;
              }
              img,
              a img {
                  border: 0px;
                  height: auto;
                  outline: none;
                  text-decoration: none;
              }
              @media only screen and (max-width: 480px) {
                  body {
                      width: 100% !important;
                      min-width: 100% !important;
                  }
                  colgroup {
                      display: none;
                  }
                  .mceColumn {
                      display: block !important;
                      width: 100% !important;
                  }
                  .mceText,
                  .mceText p {
                      font-size: 16px !important;
                      line-height: 22px !important;
                  }
                  h1 {
                      font-size: 36px !important;
                      line-height: 42px !important;
                  }
                  img {
                      height: auto !important;
                  }
              }
              body {
                  background-color: rgb(255, 255, 255);
              }
              .mceText h1,
              .mceText h2,
              .mceText h3,
              .mceText h4 {
                  font-family: "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;
              }
              .mceText,
              .mceLabel {
                  font-family: "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;
              }
              .mceText h1,
              .mceText h2,
              .mceText h3,
              .mceText h4 {
                  color: rgb(0, 0, 0);
              }
              .mceText,
              .mceLabel {
                  color: rgb(0, 0, 0);
              }
              .mceText a {
                  color: rgb(0, 0, 0);
              }
              .mceSpacing-24 h1 {
                  margin-bottom: 24px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 p {
                  margin-bottom: 24px;
              }
              .mceSpacing-24 p:last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 label {
                  margin-bottom: 24px;
              }
              .mceSpacing-24 input {
                  margin-bottom: 24px;
              }
              .mceSpacing-24 .last-child {
                  margin-bottom: 0px;
              }
              .mceSpacing-24 .mceInput + .mceErrorMessage {
                  margin-top: -12px;
              }
              .mceInput {
                  background-color: transparent;
                  border: 2px solid rgb(208, 208, 208);
                  width: 60%;
                  color: rgb(77, 77, 77);
                  display: block;
              }
              .mceInput[type="radio"],
              .mceInput[type="checkbox"] {
                  float: left;
                  margin-right: 12px;
                  display: inline;
                  width: auto !important;
              }
              .mceLabel > .mceInput {
                  margin-bottom: 0px;
                  margin-top: 2px;
              }
              .mceLabel {
                  display: block;
              }
              .mceText h1 {
                  font-size: 31.248px;
                  font-weight: 700;
              }
              @media only screen and (max-width: 480px) {
              }
              @media only screen and (min-width: 481px) and (max-width: 768px) {
              }
          </style>
  </head>
      <body>
          <!--*|IF:MC_PREVIEW_TEXT|*-->
          <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">${content.thankYou}</span><!--<![endif]-->
          <!--*|END:IF|*-->
          <center>
                <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color: rgb(255, 255, 255);">
                    <tbody>
                        <tr>
                            <td id="root" class="bodyCell" align="center" valign="top">
                                <!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 660px;">
                                    <tbody>
                                        <tr>
                                            <td style="background-position: center; background-repeat: no-repeat; background-size: cover;" class="mceSection" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                    <colgroup>
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                        <col span="1" />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style="background-color: #ffffff; background-position: center; background-repeat: no-repeat; background-size: cover; padding-top: 24px;"
                                                                class="mceColumn"
                                                                valign="top"
                                                                colspan="12"
                                                                width="100%"
                                                            >
                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="background-color: transparent; border-top: 20px solid transparent; margin-bottom: 0; margin-top: 0;"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="min-width: 100%;" valign="top"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px;" class="mceSpacing-24" align="center" valign="top">
                                                                                <img
                                                                                    width="564"
                                                                                    style="width: 564px; height: auto; max-width: 100%;"
                                                                                    alt="Logo"
                                                                                    src="https://dim.mcusercontent.com/cs/554ae35c726b037c0877d356c/images/f0dca0b9-0aeb-41da-aff4-ed6e8bc005e2.png?w=564&amp;dpr=2"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="background-color: transparent; border-top: 20px solid transparent; margin-bottom: 0; margin-top: 0;"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="min-width: 100%;" valign="top"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <div class="mceText" style="font-size: 16px; text-align: center; width: 100%;">
                                                                                    <h1 style="font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: initial;">${content.thankYou}</h1>
                                                                                    <p class="last-child">
                                                                                        ${content.now}
                                                                                    </p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <img
                                                                                    width="564"
                                                                                    style="width: 564px; height: auto; max-width: 100%;"
                                                                                    alt=""
                                                                                    src="https://dim.mcusercontent.com/cs/554ae35c726b037c0877d356c/images/f128cd2c-739a-4e38-b149-3e24904e924b.jpg?w=564&amp;dpr=2&amp;rect=0%2C162%2C1363%2C628"
                                                                                    role="presentation"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px;" class="mceSpacing-24" align="center" valign="top">
                                                                                <table align="center" border="0" cellpadding="0" cellspacing="0">
                                                                                    <tbody>
                                                                                        <tr class="mceButton">
                                                                                            <td style="background-color: #881c1c; border-radius: 8px; text-align: center;" valign="top">
                                                                                                <a
                                                                                                    href="${url}"
                                                                                                    target="_blank"
                                                                                                    style="
                                                                                                        background-color: #881c1c;
                                                                                                        border-radius: 8px;
                                                                                                        border: 2px solid #881c1c;
                                                                                                        color: #ffffff;
                                                                                                        display: inline-block;
                                                                                                        position: relative;
                                                                                                        font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                                                                                                        font-size: 16px;
                                                                                                        font-weight: bold;
                                                                                                        font-style: normal;
                                                                                                        padding: 16px 28px;
                                                                                                        text-decoration: none;
                                                                                                        min-width: 30px;
                                                                                                    "
                                                                                                >
                                                                                                ${content.see}
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="background-color: transparent; border-top: 20px solid transparent; margin-bottom: 0; margin-top: 0;"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="min-width: 100%;" valign="top"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <div class="mceText" style="font-size: 16px; text-align: center; width: 100%;">
                                                                                    <p class="last-child">
                                                                                        ${content.copy}<br />
                                                                                        <span style="color: #999999;">${url}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-top: 24px;" class="mceSpacing-24" valign="top">
                                                                                <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="background-color: transparent; border-top: 20px solid transparent; margin-bottom: 0; margin-top: 0;"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="min-width: 100%;" valign="top"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px;" class="mceSpacing-24" align="center" valign="top">
                                                                                <img
                                                                                    width="564"
                                                                                    style="width: 564px; height: auto; max-width: 100%;"
                                                                                    alt=""
                                                                                    src="https://dim.mcusercontent.com/cs/554ae35c726b037c0877d356c/images/b635aef9-6fd4-4d62-bbf0-b62e05d72c3d.jpg?w=564&amp;dpr=2&amp;rect=0%2C38%2C1125%2C503"
                                                                                    role="presentation"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px; padding-bottom: 48px;" class="mceSpacing-24" valign="top">
                                                                                <div class="mceText" style="font-size: 16px; text-align: center; width: 100%;">
                                                                                    <p><strong>${content.forgot}</strong></p>
                                                                                    <p>
                                                                                        ${content.comeBack}
                                                                                    </p>
                                                                                    <p class="last-child">
                                                                                        <strong><span style="color: #881c1c;">#AIinHealth #AIMA #ICT4SDG</span></strong>
                                                                                    </p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding-left: 48px; padding-right: 48px; padding-top: 24px; padding-bottom: 48px;" class="mceSpacing-24" valign="top">
                                                                                <div class="mceText" style="font-size: 10px; text-align: center; width: 100%; font-style: italic">
                                                                                    <p>
                                                                                        ${content.TermsOfUse}
                                                                                    </p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
      </body>
  </html>
  `;

  return mail;
};
