const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getUsers, getUser, signup } = require("../controllers/users");

router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.post("/signup", signup);

module.exports = router;
