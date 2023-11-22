class SuccessError extends Error {
  constructor(message) {
    super(message);
    this.name = "SuccessError";
    this.statusCode = 200;
    this.status = "fail";
    this.isOperational = true;
  }
}

module.exports = SuccessError;
