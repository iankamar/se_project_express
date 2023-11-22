class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = NotFoundError;
