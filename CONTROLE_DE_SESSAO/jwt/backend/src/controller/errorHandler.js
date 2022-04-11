class InternalServerError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}
class NotFound extends Error {
  constructor(msg) {
    super(msg);
    this.name = "NotFound";
    this.statusCode = 404;
  }
}
class BadRequest extends Error {
  constructor(msg) {
    super(msg);
    this.name = "BadRequest";
    this.statusCode = 400;
  }
}
class Unauthorized extends Error {
  constructor(msg) {
    super(msg);
    this.name = "Unauthorized";
    this.statusCode = 401;
  }
}

module.exports = {
  InternalServerError,
  NotFound,
  BadRequest,
  Unauthorized,
};
