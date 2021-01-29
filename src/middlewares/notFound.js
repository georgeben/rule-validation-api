const HTTP_STATUS_CODES = require("http-status-codes");
const ResponseManager = require("../helpers/response");

module.exports = function notFound(req, res) {
  return ResponseManager.respondWithError(
    res,
    "The resource you are trying to access does not exist",
    null,
    HTTP_STATUS_CODES.NOT_FOUND,
  );
};
