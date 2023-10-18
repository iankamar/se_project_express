const router = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", auth, getUsers);
router.get("/:id", getUser);

module.exports = router;
