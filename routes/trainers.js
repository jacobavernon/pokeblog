var express = require("express");
var router = express.Router();
var trainersIndex = require("../controllers/trainersController");

/* GET home page. */
router.get("/", trainersIndex.index);

module.exports = router;
