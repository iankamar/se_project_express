const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODE_401 } = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODE_401)
      .json({ message: "Unauthorized - Missing or invalid token" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    console.log("Payload:", payload);

    req.user = payload;
    console.log("req.user._id:", req.user._id);

    return next();
  } catch (error) {
    return res
      .status(ERROR_CODE_401)
      .json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authMiddleware;
