const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Create

router.post("/", auth, createItem);

// Read

router.get("/", auth, getItems);

// Delete

router.delete("/:itemId", auth, deleteItem);

// Like an item
router.put("/:itemId/likes", auth, likeItem);

// Unlike an item
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
