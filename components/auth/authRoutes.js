const router = require("express").Router();
const passport = require("passport");
const AuthController = require("./authController");
const AuthValidator = require("./authValidations");
const isAuthenticated = require("../../middlewares/isAuthenticated");

router.post(
  "/register",
  AuthValidator.validateRegister(),
  AuthValidator.validate,
  AuthController.register,
);

router.post(
  "/login",
  AuthValidator.validateLogin(),
  AuthValidator.validate,
  passport.authenticate("local"),
  AuthController.login,
);

router.post("/logout", isAuthenticated, AuthController.logout);

module.exports = router;
