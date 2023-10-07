const clothingItem = require("../models/clothingItem");
const {
  ERROR_CODE_200,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL })
    .then((item) => res.status(ERROR_CODE_200).json({ data: item }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .orFail(new Error("No items found"))
    .then((items) => res.status(ERROR_CODE_200).json(items))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );
      if (error.message === "No items found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail(new Error("Item not found"))
    .then((item) => res.status(ERROR_CODE_200).json({ data: item }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );
      if (error.message === "Item not found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail(new Error("Item not found"))
    .then(() => res.status(ERROR_CODE_200).send({}))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );
      if (error.message === "Item not found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;
  console.log(itemId);
  console.log(userId);

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new Error("Item not found"))
    .then((item) => res.status(ERROR_CODE_200).json(item))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );
      if (error.message === "Item not found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;
  console.log(itemId);
  console.log(userId);

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail(new Error("Item not found"))
    .then((item) => res.status(ERROR_CODE_200).json(item))
    .catch((error) => {
      if (error.message === "Item not found") {
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
