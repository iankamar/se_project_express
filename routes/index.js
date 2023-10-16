const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_CODE_400 } = require("../utils/errors");
const auth = require("../middlewares/auth");
const login = require("../controllers/users");
const { createUser } = require("../controllers/users");

router.use("/users", users);
router.use("/items", clothingItem);
router.post("/signin", login);
router.post("/signup", createUser);
router.use(auth);

// Handling non-existent resources

router.use((req, res) => {
  res.status(ERROR_CODE_400).send({
    message: `The requested resource ${req.path} does not exist on this server.`,
  });
});

module.exports = router;
