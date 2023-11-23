class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = UnauthorizedError;
