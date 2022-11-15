const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const cors = require("./midlewares/cors");
const { requestLogger, errorLogger } = require("./midlewares/logger");
const limiter = require("./midlewares/limiter");
const helmet = require("helmet");
require("dotenv").config();

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  NODE_ENV === "production"
    ? DATA_BASE_URL
    : "mongodb://localhost:27017/moviesdb",
  { useNewUrlParser: true }
);

app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use("/", require("./routes/index"));

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
