const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: [""],
  },
  env: {
    API_URL: process.env.API_URL,
    API_URL_STAGING: process.env.API_URL_STAGING,
    WEBSITE_URL: process.env.WEBSITE_URL,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
  },
};
