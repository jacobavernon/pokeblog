var express = require("express");
var router = express.Router();
var blogController = require("../controllers/blogController");

// This is our blog
router.get("/", blogController.getIndex);
router.get("/posts/:author", blogController.getPost);
router.post("/posts", blogController.createPost);

module.exports = router;
