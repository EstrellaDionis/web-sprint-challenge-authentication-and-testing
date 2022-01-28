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

// 4- On FAILED registration due to the `username` being taken,
//       the response body should include a string exactly as follows: "username taken".

// 1) check IF username already exists in the database
// 2) if user is in the database: return status(401).json({ message: "username taken"})

// "username and password required"
module.exports = {
  validateProperties,
  checkUsernameExists,
};
