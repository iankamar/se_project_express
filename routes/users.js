const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");
const { authMiddleware } = require("../middlewares/auth");
// const { getUsers, getUser, createUser, login } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, authMiddleware, updateUser);
// router.get("/", getUsers);
// router.get("/:id", getUser);
// router.post("/", createUser);

module.exports = router;
