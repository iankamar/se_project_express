const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_CODE_404 } = require("../utils/errors");

const { login, signup } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", signup);
router.use("/users", users);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_CODE_404).send({
    message: `The requested resource ${req.path} does not exist on this server.`,
  });
});

module.exports = router;
