const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ERROR_CODE_400,
  ERROR_CODE_404,
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

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (user) {
        return res
          .status(ERROR_CODE_400)
          .json({ message: "User with this email already exists" });
      }

      bcrypt.hash(password, 10).then((hash) => {
        const newUser = new User({ name, avatar, email, password: hash });

        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => {
            if (err.name === "ValidationError") {
              return res.status(ERROR_CODE_400).json({ message: err.message });
            }
            return res
              .status(ERROR_CODE_500)
              .json({ message: "An error occurred on the server" });
          });
      });
    })
    .catch(() =>
      res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" }),
    );
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(ERROR_CODE_404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (e) {
    res
      .status(ERROR_CODE_500)
      .json({ message: "An error occurred on the server" });
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "avatar"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "An error occurred on the server" });
  }
};

// login controller
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
      res.status(401).send({ message: error.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
