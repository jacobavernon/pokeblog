var express = require("express");
var router = express.Router();
var controllerIndex = require("../controllers/indexController");

/* GET home page. */
router.get("/", controllerIndex.index);

module.exports = router;
