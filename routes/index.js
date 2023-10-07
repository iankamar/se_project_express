const router = require("express").Router();
const users = require("./users");
// eslint-disable-next-line camelcase
const clothingItem = require("./clothingitem");
const { ERROR_CODE_400 } = require("../utils/errors");

router.use("/users", users);
router.use("/items", clothingItem);

// Handling non-existent resources

router.use((req, res) => {
  res.status(ERROR_CODE_400).send({
    message: `The requested resource ${req.path} does not exist on this server.`,
  });
});

module.exports = router;
