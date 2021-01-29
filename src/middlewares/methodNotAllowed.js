const HTTP_STATUS_CODES = require("http-status-codes");
const ResponseManager = require("../helpers/response");

module.exports = function methodNotAllowedHandler(req, res) {
  return ResponseManager.respondWithError(
    res,
    `http method '${req.method}' for API endpoint (${req.originalUrl}) is not allowed.`,
    null,
    HTTP_STATUS_CODES.METHOD_NOT_ALLOWED,
  );
};
