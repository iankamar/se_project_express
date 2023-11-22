const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// Define validation schemas
const itemSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    weatherType: Joi.string().valid("Hot", "Warm", "Cold").required(),
  }),
});

const itemIdSchema = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required(),
  }),
});

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
