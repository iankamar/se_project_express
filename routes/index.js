const router = require("express").Router();
const auth = require("../middlewares/auth");
const users = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_CODE_400 } = require("../utils/errors");

const { login } = require("../controllers/users");
const { signup } = require("../controllers/users");

router.post("/signin", auth, login);
router.post("/signup", auth, signup);
router.use("/users", users);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_CODE_400).send({
    message: `The requested resource ${req.path} does not exist on this server.`,
  });
});

module.exports = router;
