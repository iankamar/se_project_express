class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}
class SuccessError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "SuccessError";
    this.statusCode = 200;
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}
class InternalServerError extends CustomError {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

module.exports = {
  SuccessError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
