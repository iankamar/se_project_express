const InternalServerError = require("../errors/InternalServerError");

const errorHandler = (error, req, res, next) => {
  console.log("Middleware Error Handling");
  const errorStatus = error.statusCode || InternalServerError.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";

  res.status(errorStatus).json({
    message: errorMessage,
  });
};

module.exports = errorHandler;
