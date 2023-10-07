const User = require("../models/users");
const {
  ERROR_CODE_200,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find()
    .orFail(new Error("No users found"))
    .then((users) => res.status(ERROR_CODE_200).json(users))
    .catch((error) => {
      if (error.message === "No users found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new Error("User not found"))
    .then((user) => res.status(ERROR_CODE_200).json(user))
    .catch((error) => {
      if (error.message === "User not found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  const newUser = new User({
    name,
    avatar,
  });

  newUser
    .save()
    .then((user) => res.status(ERROR_CODE_200).json(user))
    .catch(() => {
      res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
