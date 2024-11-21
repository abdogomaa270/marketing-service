const { check } = require("express-validator");
const { validatorMiddleware } = require("../middlewares/validatorMiddleware");

//validate data for process-data endpoint
exports.validateRequest = [
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongoId"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email"),
  check("phones").notEmpty().withMessage("phones is required"),
  validatorMiddleware,
];
