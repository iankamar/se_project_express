const { InternalServerError } = require("../errors/InternalServerError");

const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const errorStatus = err.statusCode || InternalServerError.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).json({
    message: errorMessage,
  });
};

module.exports = errorHandler;
