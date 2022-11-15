const mongoose = require("mongoose");
const { validateLink } = require("../midlewares/validation");

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: "Невалидная ссылка",
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: "Невалидная ссылка",
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: "Невалидная ссылка",
    },
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("movie", movieSchema);
