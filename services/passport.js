const passport = require("passport");
const UserModel = require("../components/users/userModel");
const LocalStrategy = require("passport-local").Strategy;
const ApiError = require("../common/ApiError");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function localVerify(email, password, done) {
      try {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user)
          return done(ApiError.unauthorized("Incorrect email or password!"));
        if (user.provider === "google")
          return done(
            ApiError.unauthorized("This email associated with google account!"),
          );
        const isPasswordValid = await user.isPasswordValid(password);
        return isPasswordValid
          ? done(null, user.email)
          : done(ApiError.unauthorized("Incorrect email or password!"));
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.serializeUser((userEmail, done) => {
  return done(null, userEmail);
});

passport.deserializeUser(async (userEmail, done) => {
  const user = await UserModel.findOne({ email: userEmail }).lean();
  return user
    ? done(null, user)
    : done(null, false, ApiError.unauthorized("Log in with valid user!"));
});

module.exports = passport;
