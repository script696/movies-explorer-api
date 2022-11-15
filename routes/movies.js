const router = require("express").Router();
const {
  createMovieValidation,
  searchMovieValidation,
} = require("../midlewares/validation");

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

router.get("/", getMovies);
router.post("/", createMovieValidation, createMovie);
router.delete("/:movieId", searchMovieValidation, deleteMovie);

module.exports = router;
