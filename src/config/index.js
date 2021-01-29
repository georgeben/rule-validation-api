const env = require("dotenv-extended");
const packageJson = require("../../package.json");

env.load({
  includeProcessEnv: true,
  errorOnMissing: process.env.NODE_ENV === "production",
});

const { name, version } = packageJson;
const commonConfig = {
  port: process.env.PORT || 4002,
  applicationName: name,
  applicationVersion: version,
  bodyLimit: process.env.BODY_LIMIT || "20kb",
  allowedOrigins: process.env.ALLOWED_ORIGINS || "*",
};

module.exports = {
  development: {
    ...commonConfig,
    logFormat: "dev",
  },
  production: {
    ...commonConfig,
    logFormat: "combined",
  },
  test: {
    ...commonConfig,
    logFormat: "dev",
  },
}[process.env.NODE_ENV || "development"];
