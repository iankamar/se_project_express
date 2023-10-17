const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
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

/*
const router = require("express").Router();
const auth = require("../middlewares/auth");
const user = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_CODE_400 } = require("../utils/errors");

const login = require("../controllers/users");
const { createUser } = require("../controllers/users");

router.user("/users", user);
router.use("/items", clothingItem);
router.post("/signin", login);
router.post("/signup", createUser);

// Handling non-existent resources

router.use(auth, (req, res) => {
  res.status(ERROR_CODE_400).send({
    message: `The requested resource ${req.path} does not exist on this server.`,
  });
});

module.exports = router;
*/
