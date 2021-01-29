const HTTP_STATUS_CODES = require("http-status-codes");
const { JOI_ERRORS } = require("../helpers/constants");
const ResponseManager = require("../helpers/response");

/**
 * Validates the request body against a Joi schema
 * @param {Object} schema - Joi schema used for validation
 */

module.exports = function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error === undefined) {
      return next();
    }
    const details = error.details[0];
    const { type, context } = details;

    switch (type) {
      case JOI_ERRORS.REQUIRED:
        return ResponseManager.respondWithError(
          res,
          `${context.label} is required.`,
          null,
          HTTP_STATUS_CODES.BAD_REQUEST,
        );
      case JOI_ERRORS.OBJECT_BASE:
        return ResponseManager.respondWithError(
          res,
          `${context.label} should be an ${context.type}.`,
          null,
          HTTP_STATUS_CODES.BAD_REQUEST,
        );
      case JOI_ERRORS.INVALID_TYPE:
        return ResponseManager.respondWithError(
          res,
          `${context.label} should be a|an ${context.types}.`,
          null,
          HTTP_STATUS_CODES.BAD_REQUEST,
        );
      case JOI_ERRORS.STRING_BASE:
        return ResponseManager.respondWithError(
          res,
          `${context.label} should be an string.`,
          null,
          HTTP_STATUS_CODES.BAD_REQUEST,
        );
      case JOI_ERRORS.ALLOW_ONLY:
        return ResponseManager.respondWithError(
          res,
          `${context.label} must be one of ${context.valids}.`,
          null,
          HTTP_STATUS_CODES.BAD_REQUEST,
        );
      default:
        return ResponseManager.respondWithError(
          res,
          "Invalid payload passed.",
          null,
          HTTP_STATUS_CODES.BAD_REQUEST,
        );
    }
  };
};
