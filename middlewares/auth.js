const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Missing or invalid token" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    console.log("Payload:", payload);

    req.user = payload;
    console.log("req.user._id:", req.user._id);

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authMiddleware;
