class BadRequest extends Error {
  constructor() {
    super();
    this.message = "Введены некорректные данные";
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
