/*
const { InternalServerError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  // const errorStatus = err.statusCode || InternalServerError;
  const errorStatus = err.statusCode || InternalServerError.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;
*/
const { InternalServerError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  console.log("Error object:", err);

  const errorStatus = err.statusCode || InternalServerError;
  console.log("Resolved status code:", errorStatus);

  const errorMessage = err.message || "Something went wrong";
  console.log("Resolved error message:", errorMessage);

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;
