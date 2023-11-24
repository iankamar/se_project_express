const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");

const { validateURL } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);

router.patch(
  "/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value, helpers) =>
        validateURL(value, helpers),
      ),
    }),
  }),
  updateUser,
);

module.exports = router;
