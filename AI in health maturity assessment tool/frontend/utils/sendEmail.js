import AWS from "aws-sdk";
import { theEmail } from "./email";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
  region: process.env.AWS_REGION_MAIL,
});

const SES = new AWS.SES();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sendEmail = async ({ url, email, content }) => {
  const arrayEmail = email.split(",");
  const theMail = theEmail(url, content);
  const emailTemplate = theMail;
  const params = {
    Destination: {
      ToAddresses: arrayEmail,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailTemplate,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the message body in text format.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: content.subject,
      },
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Source: `${process.env.EMAIL_NAME_FROM} <${process.env.EMAIL_FROM}>`,
  };

  try {
    await SES.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: "Email sent!",
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      statusCode: 400,
      body: "Sending failed",
    };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { sendEmail };
