const HTTP_STATUS_CODE = require("http-status-codes");
const { VALIDATION_CONDITIONS } = require("../helpers/constants");

/**
 * Business logic for validating rules
 */
class ValidationRepository {
  /**
   *
   * @param {Object} obj - An object
   * @param {String} level - Level 1 field in obj
   * @param  {...String} rest - fields at subsequent levels of obj
   */
  // eslint-disable-next-line class-methods-use-this
  static getFieldValue(obj, level, ...rest) {
    if (obj === undefined) return null;
    if (rest.length === 0 && Object.prototype.hasOwnProperty.call(obj, level)) {
      return obj[level];
    }
    return this.getFieldValue(obj[level], ...rest);
  }

  /**
   * Validates data according to a rule
   * @param {Object} rule - Rule to be used for validating data
   * @param {String} rule.field - The field to validate
   * @param {String} rule.condition - Condition to use for validating the rule
   * @param {String} rule.condition_value - The condition value to run the rule against
   * @param {Object|Array|String} data - Data to validate
   * @returns {{ validationSuccessful: boolean, fieldValue: any }}
   */
  static validate(rule, data) {
    const { field, condition, condition_value } = rule;
    const fieldPath = field.split(".");

    if (fieldPath.length > 2) {
      const error = new Error(
        "Nesting of field should not be more than two levels.",
      );
      error.status_code = HTTP_STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    const fieldValue = this.getFieldValue(data, ...fieldPath);
    if (!fieldValue) {
      const error = new Error(`field ${field} is missing from data.`);
      error.status_code = HTTP_STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    let validationSuccessful = false;

    switch (condition) {
      case VALIDATION_CONDITIONS.EQUAL:
        validationSuccessful = fieldValue === condition_value;
        break;
      case VALIDATION_CONDITIONS.NOT_EQUAL:
        validationSuccessful = fieldValue !== condition_value;
        break;
      case VALIDATION_CONDITIONS.GREATER_THAN:
        validationSuccessful = fieldValue > condition_value;
        break;
      case VALIDATION_CONDITIONS.GREATER_THAN_OR_EQUAL:
        validationSuccessful = fieldValue >= condition_value;
        break;
      case VALIDATION_CONDITIONS.CONTAINS:
        if (!Array.isArray(fieldValue) && typeof fieldValue !== "string") {
          const error = new Error(`${field} must be a|an [string, array].`);
          error.status_code = HTTP_STATUS_CODE.BAD_REQUEST;
          throw error;
        }
        validationSuccessful = fieldValue.includes(condition_value);
        break;
      default:
        throw new Error("Invalid condition passed.");
    }

    return { validationSuccessful, fieldValue };
  }
}

module.exports = ValidationRepository;
