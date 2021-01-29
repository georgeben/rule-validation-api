const ResponseManager = require("../helpers/response");
const logger = require("../lib/logger");

/**
 * Application error handler
 * @param {*} err - Error thrown
 * @param {*} req - Incoming request
 * @param {*} res - Response stream
 * @param {*} next - Next middleware
 */
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  logger.error(`An error occurred: ${err.message}`, { err });
  return ResponseManager.respondWithError(res, err.message, null, err.status_code);
};
