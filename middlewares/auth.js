const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized - Missing or invalid token");
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    console.log("Payload:", payload);

    req.user = payload;
    console.log("req.user._id:", req.user._id);

    return next();
  } catch (error) {
    throw new UnauthorizedError("Unauthorized - Invalid token");
  }
};

module.exports = auth;
