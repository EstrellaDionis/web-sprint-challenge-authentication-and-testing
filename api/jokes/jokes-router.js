// do not make changes to this file
const router = require("express").Router();
const jokes = require("./jokes-data");
const { restrictEndpoint } = require("./jokes-middleware");

router.get("/", restrictEndpoint, (req, res) => {
  res.status(200).json(jokes);
});

module.exports = router;
