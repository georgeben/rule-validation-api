const HTTP_STATUS_CODES = require("http-status-codes");

/**
 * Formats and returns server responses
 */
class ResponseManager {
  /**
   * Returns a successful API response
   * @param {Object} res - Response stream
   * @param {Object} data - Data to send along with response
   * @param {String} message - Information about the result of the request
   * @param {Number} status_code - HTTP status code
   */
  static respondWithSuccess(
    res,
    data = null,
    message = "Your action was successful",
    status_code = HTTP_STATUS_CODES.OK,
  ) {
    return res.status(status_code).json({
      message,
      status: "success",
      data,
    });
  }

  /**
   * Returns an unsuccessful API response
   * @param {Object} res - Response stream
   * @param {String} message - Information about the result of the request
   * @param {Object} data - Data to send along with response
   * @param {Number} status_code - HTTP status code
   */
  static respondWithError(
    res,
    message = "An unexpected error happened",
    data = null,
    status_code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
  ) {
    return res.status(status_code).json({
      message,
      status: "error",
      data,
    });
  }
}

module.exports = ResponseManager;
