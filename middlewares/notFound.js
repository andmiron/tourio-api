const ApiError = require("../common/ApiError");

module.exports = (req, res, next) => {
  next(ApiError.notFound(`${req.originalUrl} Not found`));
};
