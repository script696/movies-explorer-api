const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const BadRequest = require("../errors/bad-request");

const validateLink = (item) =>
  /^((http|https):\/\/)(www\.)?([a-zA-Z0-9-]+.)+[\w-]+(\/[\w- ./?%&=#])?\/?$/.test(
    item
  );

const validationURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequest();
  } else {
    return value;
  }
};

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().custom(validationURL),
    thumbnail: Joi.string().required().custom(validationURL),
    image: Joi.string().required().custom(validationURL),
    movieId: Joi.number().required(),
  }),
});

const searchMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  updateUserValidation,
  loginUserValidation,
  createUserValidation,
  createMovieValidation,
  searchMovieValidation,
  validateLink,
};
