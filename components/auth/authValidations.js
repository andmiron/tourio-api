const { body } = require("express-validator");
const UserModel = require("../users/userModel");
const BaseValidator = require("../../common/BaseValidator");

class AuthValidator extends BaseValidator {
  constructor() {
    super();
  }

  validateRegister() {
    return [
      body("email")
        .isEmail()
        .withMessage("Email is not valid!")
        .custom(async (email) => {
          const user = await UserModel.findOne({ email });
          if (user) return Promise.reject("User already exists!");
        }),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long!"),
    ];
  }

  validateLogin() {
    return [
      body("email").isEmail().withMessage("Email is not valid!"),
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long!"),
    ];
  }
}

module.exports = new AuthValidator();
