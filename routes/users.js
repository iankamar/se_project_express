const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);

router.patch(
  "/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string(),
    }),
  }),
  updateUser,
);

module.exports = router;
