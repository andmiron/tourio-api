const ApiError = require("../common/ApiError");

module.exports = (req, res, next) => {
  console.log(req.user);
  return req.isAuthenticated()
    ? next()
    : next(ApiError.unauthorized("Please log in!"));
};
