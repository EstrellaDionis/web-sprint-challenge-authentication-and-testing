const db = require("../../data/dbConfig");

const validateProperties = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: "username and password required" });
  } else {
    next();
  }
};

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const userAttempt = await db("users").where("username", username).first();
  if (userAttempt === undefined) {
    next();
  } else {
    return res.status(401).json({ message: "username taken" });
  }
};

const validateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const userAttempt = await db("users").where("username", username).first();
    console.log(req.user);
    if (!userAttempt) {
      next({ status: 422, message: "Invalid credentials" });
    } else {
      req.user = userAttempt;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateProperties,
  checkUsernameExists,
  validateUsername,
};
