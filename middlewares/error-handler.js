const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
module.exports = errorHandler;
