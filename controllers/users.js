const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const BadRequest = require("../errors/bad-request");
const AuthecationError = require("../errors/authecation-error");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-error");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hash,
    });
    res.send({
      data: {
        name,
        email,
      },
    });
  } catch (err) {
    if (err.code === 11000) next(new ConflictError("Польватель с такими данными уже существует"));
    switch (err.name) {
      case "ValidationError":
        next(new BadRequest("Введены некорректные данные"));
        break;
      default:
        next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new AuthecationError("Неправильные почта или пароль");
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new AuthecationError("Неправильные почта или пароль");
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
      { expiresIn: "7d" },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      new NotFoundError("Пользователь не найден"),
    );
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.updateMe = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(new NotFoundError("Пользователь не найден"));
    res.send({ data: user });
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        next(new BadRequest("Введены некорректные данные"));
        break;
      default:
        next(err);
    }
  }
};
