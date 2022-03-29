const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.status(403).json({ status: false, error: "user not authorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.user = decoded;
  } catch (e) {
    res.status(401).json({ status: false, error: "invalid token" });
    return;
  }
  return next();
};
module.exports = verifyToken;
