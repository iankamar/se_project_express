const User = require("../models/users");
const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch(() => {
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
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
  const { name, avatar } = req.body;

  const newUser = new User({ name, avatar });

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
};

module.exports = { getUsers, getUser, createUser };
