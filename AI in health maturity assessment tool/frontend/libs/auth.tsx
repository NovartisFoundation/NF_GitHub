import { Auth, ServiceResponse } from "../utils/types";

let baseRoot = process.env.API_URL;

if (process.env.API_URL_STAGING) {
  baseRoot = process.env.API_URL_STAGING;
}

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;

const oauthURL = `${baseRoot}/oauth/token`;

export const accessToken = async (
  username: string,
  password: string
): Promise<ServiceResponse<Auth>> => {
  let res = {
    success: false,
    data: null,
    message: "Failed to fetch",
  };

  // Build formData object.
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("client_secret", clientSecret);
  formdata.append("grant_type", "password");
  formdata.append("client_id", clientId);

  await fetch(oauthURL, {
    method: "POST",
    body: formdata,
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.error)
        res = {
          success: false,
          data: null,
          message: result.error_description,
        };
      else
        res = {
          success: true,
          data: result as Auth,
          message: "",
        };
    })
    .catch((error) => {
      res = {
        success: false,
        data: null,
        message: error,
      };
    });

  return res;
};

export const refreshToken = async (
  token: string
): Promise<ServiceResponse<Auth>> => {
  let res = {
    success: false,
    data: null,
    message: "Failed to fetch",
  };

  // Build formData object.
  const formdata = new FormData();
  formdata.append("refresh_token", token);
  formdata.append("client_secret", clientSecret);
  formdata.append("grant_type", "refresh_token");
  formdata.append("client_id", clientId);

  await fetch(oauthURL, {
    method: "POST",
    body: formdata,
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.error)
        res = {
          success: false,
          data: null,
          message: result.error_description,
        };
      else
        res = {
          success: true,
          data: result as Auth,
          message: "",
        };
    })
    .catch((error) => {
      res = {
        success: false,
        data: null,
        message: error,
      };
    });

  return res;
};
