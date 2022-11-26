const Movie = require("../models/movie");
const BadRequest = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-error");
const {
  NOT_FOUND_MOVIE_ERR,
  FORBIDDEN_ERR,
  INCORRECT_DATA_ERR,
} = require("../utils/constants");

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send({ data: movies });
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    thumbnail,
    image,
    movieId,
  } = req.body;
  const owner = req.user._id;
  try {
    const movie = await Movie.create({
      nameRU,
      nameEN,
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      thumbnail,
      image,
      movieId,
      owner,
    });
    res.send({ data: movie });
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequest(INCORRECT_DATA_ERR));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const userId = req.user._id;
  const reqMovie = req.params.movieId;
  try {
    const movie = await Movie.findById(reqMovie).orFail(
      new NotFoundError(NOT_FOUND_MOVIE_ERR),
    );
    const movieOwnerId = movie.owner.toString();
    if (movieOwnerId === userId) {
      const deletedMovie = await Movie.findByIdAndDelete(reqMovie);
      res.send({ data: deletedMovie });
    } else {
      throw new ForbiddenError(FORBIDDEN_ERR);
    }
  } catch (err) {
    next(err);
  }
};
