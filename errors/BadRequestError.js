class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = BadRequestError;
