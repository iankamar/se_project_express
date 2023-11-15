const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
const { NotFoundError } = require("../utils/errors");

const { login, signup } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", signup);
router.use("/users", users);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NotFoundError).send({
    message: `The requested resource ${req.path} does not exist on this server.`,
  });
});

module.exports = router;
