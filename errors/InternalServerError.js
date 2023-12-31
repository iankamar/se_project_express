class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = InternalServerError;
