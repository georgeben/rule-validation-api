const Joi = require("joi");
const { VALIDATION_CONDITIONS } = require("../helpers/constants");

exports.validateRuleSchema = Joi.object({
  rule: Joi.object({
    field: Joi.string().required(),
    condition: Joi.string()
      .trim()
      .valid.apply(Joi, Object.values(VALIDATION_CONDITIONS))
      .required(),
    condition_value: Joi.any().required(),
  }).required(),
  data: [
    Joi.object().required(),
    Joi.array().required(),
    Joi.string().required(),
  ],
});
