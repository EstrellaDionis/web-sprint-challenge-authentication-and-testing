const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

const restrictEndpoint = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next({ status: 401, message: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: "Token invalid" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

module.exports = {
  restrictEndpoint,
};
