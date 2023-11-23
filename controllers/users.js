const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const { JWT_SECRET } = require("../utils/config");
// const errorHandler = require("../middlewares/error-handler");

const signup = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    if (!email) {
      next(new BadRequestError("Email is required"));
      return;
    }

    const user = await User.findOne({ email }).select("+password");
    if (user) {
      next(new ConflictError("User with this email already exists"));
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, avatar, email, password: hash });

    await newUser.save();

    res.json({
      name: newUser.name,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(new BadRequestError("Invalid data"));
    } else {
      next(error);
    }
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError("User not found"));
      return;
    }
    res.json(user);
  } catch (error) {
    if (error.name === "CastError") {
      next(new BadRequestError("Invalid data"));
    } else {
      next(error);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      next(new NotFoundError("User not found"));
      return;
    }

    res.json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(new BadRequestError("Invalid data"));
    } else {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

module.exports = {
  signup,
  getCurrentUser,
  updateUser,
  login,
};
