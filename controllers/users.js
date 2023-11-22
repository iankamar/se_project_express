const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const { JWT_SECRET } = require("../utils/config");

const signup = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    res.status(BadRequestError).json({ message: "Email is required" });
  } else {
    User.findOne({ email })
      .select("+password")
      .then((user) => {
        if (user) {
          res
            .status(ConflictError)
            .json({ message: "User with this email already exists" });
        } else {
          bcrypt.hash(password, 10).then((hash) => {
            const newUser = new User({ name, avatar, email, password: hash });

            newUser
              .save()
              .then(() =>
                res.json({
                  name: newUser.name,
                  avatar: newUser.avatar,
                  email: newUser.email,
                }),
              )
              .catch((error) => {
                if (error.name === "ValidationError") {
                  throw new BadRequestError(error.message);
                }
                next(error);
              });
          });
        }
      })
      .catch(next);
  }
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return res.json(user);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }
      next(error);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return res.json(user);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }
      next(error);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((error) => {
      throw new UnauthorizedError(error.message);
    });
};

module.exports = {
  signup,
  getCurrentUser,
  updateUser,
  login,
};
