const server = require("./app");
const config = require("./config");
const logger = require("./lib/logger");

const { port, applicationName, applicationVersion } = config;

server.listen(port, () => {
  logger.info(
    `${applicationName} v${applicationVersion} is now running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
});

function gracefulShutdown() {
  // Prevent the server from receiving any more requests
  server.close((error) => {
    logger.info("Shutting down server");
    process.exit(error ? 1 : 0);
  });
}

process.on("SIGINT", gracefulShutdown);

process.on("SIGTERM", gracefulShutdown);
