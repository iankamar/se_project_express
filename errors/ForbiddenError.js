class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = ForbiddenError;
