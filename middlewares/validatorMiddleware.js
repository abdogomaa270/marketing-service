const { validationResult } = require("express-validator");
// @desc Finds the validation errors in this request and wraps them in an object with handy functions
exports.validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //if no error go to next handler middleware
  next();
};
