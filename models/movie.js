const mongoose = require("mongoose");
const { validateLink } = require("../midlewares/validation");
const { INVALID_LINK } = require("../utils/constants");

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
      message: INVALID_LINK,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: INVALID_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validateLink,
      message: INVALID_LINK,
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
