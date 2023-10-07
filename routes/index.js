const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_CODE_404 } = require("../utils/errors");

router.use("/users", users);
router.use("/items", clothingItem);

// Handling non-existent resources

router.use((req, res) => {
  res.status(ERROR_CODE_404).send({ message: "Router not found" });
});

module.exports = router;
