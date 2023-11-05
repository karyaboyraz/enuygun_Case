const { defineConfig } = require("cypress");
const { EnvSettings, cypressConfig } = require("./config.js");

module.exports = defineConfig({
  ...cypressConfig,
  e2e: {
    env: EnvSettings[process.env.APP_ENV || "production"]
  }
});
