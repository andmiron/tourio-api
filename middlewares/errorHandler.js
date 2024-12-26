const ApiError = require("../common/ApiError");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      status: "error",
      data: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: "error",
    data: "Something went wrong!",
  });
};
