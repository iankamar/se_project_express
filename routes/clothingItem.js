const router = require("express").Router();
const { ERROR_CODE_404 } = require("../utils/errors");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Create

router.post("/", createItem);

// Read

router.get("/", getItems);

// Delete

router.delete("/:itemId", deleteItem);

// Like an item
router.put("/:itemId/likes", likeItem);

// Unlike an item
router.delete("/:itemId/likes", dislikeItem);

// Handling non-existent resources

router.use((req, res) => {
  res.status(ERROR_CODE_404).send({ message: "Router not found" });
});

module.exports = router;
