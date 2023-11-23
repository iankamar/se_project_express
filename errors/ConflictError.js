class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = ConflictError;
