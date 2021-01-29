const HTTP_STATUS_CODES = require("http-status-codes");
const BaseController = require("./BaseController");
const ValidationRepository = require("../repositories/ValidationRepository");

class IndexController extends BaseController {
  /**
   * Returns information about candidate
   * @param {Object} _ - Incoming request
   * @param {Object} res - Response stream
   */
  async getApplicationInfo(_, res) {
    const data = {
      name: "Kurobara Benjamin George",
      github: "@georgeben",
      email: "msdcconnect@gmail.com",
      mobile: "07082586682",
      twitter: "@bengtheonly",
    };
    return this.responseManager.respondWithSuccess(
      res,
      data,
      "My Rule-Validation API",
    );
  }

  /**
   * Processes requests for validations
   * @param {Object} req - Incoming request
   * @param {Object} res - Response stream
   */
  async validateRule(req, res) {
    const { rule, data } = req.body;
    if (!data) {
      return this.responseManager.respondWithError(
        res,
        "data is required.",
        null,
        HTTP_STATUS_CODES.BAD_REQUEST,
      );
    }
    const { validationSuccessful, fieldValue } = ValidationRepository.validate(
      rule,
      data,
    );
    if (!validationSuccessful) {
      return this.responseManager.respondWithError(
        res,
        `field ${rule.field} failed validation.`,
        {
          validation: {
            error: true,
            field: rule.field,
            field_value: fieldValue,
            condition: rule.condition,
            condition_value: rule.condition_value,
          },
        },
        HTTP_STATUS_CODES.BAD_REQUEST,
      );
    }
    return this.responseManager.respondWithSuccess(
      res,
      {
        validation: {
          error: false,
          field: rule.field,
          field_value: fieldValue,
          condition: rule.condition,
          condition_value: rule.condition_value,
        },
      },
      `field ${rule.field} successfully validated.`,
    );
  }
}

module.exports = new IndexController();
