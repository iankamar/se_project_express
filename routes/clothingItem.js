const router = require("express").Router();
const auth = require("../middlewares/auth");

const { itemSchema, itemIdSchema } = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// Create
router.post("/", auth, itemSchema, createItem);

// Read
router.get("/", getItems);

// Delete

router.delete("/:itemId", auth, itemIdSchema, deleteItem);

// Like an item
router.put("/:itemId/likes", auth, itemIdSchema, likeItem);

// Unlike an item
router.delete("/:itemId/likes", auth, itemIdSchema, dislikeItem);

module.exports = router;
