import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../utils/sendEmail";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { url, email, content } = req.body;
    const resultSendEmail = await sendEmail({ url, email, content });
    if (resultSendEmail.statusCode === 200) {
      return res.status(200).end();
    }
    return res.status(500).json({
      error: {
        code: "not_found",
        messgae: "The request was not send properly to AWS",
      },
    });
  }
  return res.status(500).json({
    error: {
      code: "not_found",
      messgae:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
};
