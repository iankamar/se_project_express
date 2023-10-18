const router = require("express").Router();
const { getUsers, getUser, signup } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/signup", signup);

module.exports = router;
