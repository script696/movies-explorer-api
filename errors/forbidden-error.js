class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = "Доступ запрещен";
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
