const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es", "pt"],
  },
  localePath: path.resolve("./public/static/locales"),
};
