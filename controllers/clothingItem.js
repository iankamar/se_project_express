const clothingItem = require("../models/clothingItem");
const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.json({ data: item }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.name === "ValidationError") {
        return res.status(ERROR_CODE_400).json({ message: error.message });
      }
      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.json(items))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.name === "CastError") {
        return res.status(ERROR_CODE_400).json({ message: error.message });
      }

      return res
        .status(ERROR_CODE_500)
        .json({ message: "An error occurred on the server" });
    });
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the item by its id
    const item = await clothingItem.findById(itemId);

    if (!item) {
      return res.status(ERROR_CODE_404).json({ message: "Item not found" });
    }

    // Check if the logged-in user is the owner of the item
    if (item.owner.toString() !== req.user._id) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to delete this item",
      });
    }

    // If the user is the owner, delete the item
    await item.remove();

    res.json({ message: "Item deleted successfully" });
  } catch (e) {
    console.error(
      `Error ${e.name} with the message ${e.message} has occurred while executing the code`,
    );

    if (e.name === "CastError") {
      return res.status(ERROR_CODE_400).json({ message: "Invalid ID" });
    }

    return res
      .status(ERROR_CODE_500)
      .json({ message: "An error occurred on the server" });
  }
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
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(ERROR_CODE_400).json({ message: "Invalid ID" });
      }

      return res
        .status(ERROR_CODE_500)
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
        return res.status(ERROR_CODE_404).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(ERROR_CODE_400).json({ message: "Invalid ID" });
      }

      return res
        .status(ERROR_CODE_500)
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
