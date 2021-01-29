const { Router } = require("express");
const catchErrors = require("../middlewares/catchErrors");
const IndexController = require("../controllers/IndexController");
const methodNotAllowed = require("../middlewares/methodNotAllowed");
const validator = require("../middlewares/validator");
const { validateRuleSchema } = require("../validations/validate-rule.schema");

const router = Router();

router
  .route("/")
  .get(
    catchErrors(IndexController.getApplicationInfo),
  )
  .all(methodNotAllowed);

router
  .route("/validate-rule")
  .post(
    validator(validateRuleSchema),
    catchErrors(IndexController.validateRule),
  )
  .all(methodNotAllowed);

module.exports = router;
