const { validationResult } = require("express-validator");
const ApiError = require("./ApiError");

class BaseValidator {
  validate(req, res, next) {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) return next();
    const errorMessage = validationErrors
      .formatWith((err) => err.msg)
      .array({ onlyFirstError: true });
    return next(ApiError.badRequest(errorMessage[0]));
  }
}

module.exports = BaseValidator;
