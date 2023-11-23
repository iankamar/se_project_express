const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.json({ data: item }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.name === "ValidationError") {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .sort({ createdAt: -1 })
    .then((items) => res.json(items))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.name === "CastError") {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError(
          "Forbidden: You do not have permission to delete this item",
        );
      }
      return clothingItem.deleteOne({ _id: itemId });
    })
    .then(() => res.send({ message: "Item deleted" }))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.message === "Item not found") {
        next(new NotFoundError(error.message));
      } else if (error.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(error);
      }
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  console.log(itemId);
  console.log(userId);

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.json(item))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.message === "Item not found") {
        next(new NotFoundError(error.message));
      } else if (error.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(error);
      }
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  console.log(itemId);
  console.log(userId);

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.json(item))
    .catch((error) => {
      console.error(
        `Error ${error.name} with the message ${error.message} has occurred while executing the code`,
      );

      if (error.message === "Item not found") {
        next(new NotFoundError(error.message));
      } else if (error.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
