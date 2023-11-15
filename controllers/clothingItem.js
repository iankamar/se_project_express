const clothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, link } = req.body;

  clothingItem
    .create({ name, weather, link, owner: req.user._id })
    .then((item) => res.json({ data: item }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.name === "ValidationError") {
        return res.status(BadRequestError).json({ message: error.message });
      }
      return res
        .status(InternalServerError)
        .json({ message: "An error occurred on the server" });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .sort({ createdAt: -1 })
    .then((items) => res.json(items))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.name === "CastError") {
        return res.status(BadRequestError).json({ message: error.message });
      }

      return res
        .status(InternalServerError)
        .json({ message: "An error occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .then((item) => {
      if (!item) {
        throw new Error("Item not found");
      }

      if (item.owner.toString() !== userId) {
        return res.status(ForbiddenError).json({
          message: "Forbidden: You do not have permission to delete this item",
        });
      }

      return clothingItem.deleteOne({ _id: itemId });
    })
    .then(() => res.send({ message: "Item deleted" }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.message === "Item not found") {
        return res.status(NotFoundError).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(BadRequestError).json({ message: "Invalid ID" });
      }

      return res
        .status(InternalServerError)
        .json({ message: "An error occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  console.log(itemId);
  console.log(userId);

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new Error("Item not found"))
    .then((item) => res.json(item))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.message === "Item not found") {
        return res.status(NotFoundError).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(BadRequestError).json({ message: "Invalid ID" });
      }

      return res
        .status(InternalServerError)
        .json({ message: "An error occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  console.log(itemId);
  console.log(userId);

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail(new Error("Item not found"))
    .then((item) => res.json(item))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.message === "Item not found") {
        return res.status(NotFoundError).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(BadRequestError).json({ message: "Invalid ID" });
      }

      return res
        .status(InternalServerError)
        .json({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
