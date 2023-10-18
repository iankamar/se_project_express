const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const {
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_404,
  ERROR_CODE_409,
  ERROR_CODE_500,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch(() =>
      res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" }),
    );
};

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CODE_404).json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(ERROR_CODE_400).json({ message: "Invalid id" });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const signup = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    res.status(ERROR_CODE_400).json({ message: "Email is required" });
  } else {
    User.findOne({ email })
      .select("+password")
      .then((user) => {
        if (user) {
          res
            .status(ERROR_CODE_409)
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
                  res.status(ERROR_CODE_400).json({ message: error.message });
                } else {
                  res
                    .status(ERROR_CODE_500)
                    .json({ message: "An error occurred on the server" });
                }
              });
          });
        }
      })
      .catch(() =>
        res
          .status(ERROR_CODE_500)
          .json({ message: "An error occurred on the server" }),
      );
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(ERROR_CODE_404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (e) {
    return res
      .status(ERROR_CODE_500)
      .json({ message: "An error occurred on the server" });
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "avatar"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(ERROR_CODE_400).json({ message: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(ERROR_CODE_404).json({ message: "User not found" });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    return res.json(user);
  } catch (e) {
    return res
      .status(ERROR_CODE_500)
      .json({ message: "An error occurred on the server" });
  }
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
      res.status(ERROR_CODE_401).send({ message: error.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  signup,
  getCurrentUser,
  updateUser,
  login,
};
