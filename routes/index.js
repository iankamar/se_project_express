const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", users);
router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(
    new NotFoundError(
      `The requested resource ${req.path} does not exist on this server.`,
    ),
  );
});

module.exports = router;
