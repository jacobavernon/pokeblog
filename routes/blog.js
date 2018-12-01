var express = require("express");
var router = express.Router();
var blogController = require("../controllers/blogController");
const { catchErrors } = require('../handlers/errorHandlers')

// This is our blog
router.get("/", catchErrors(blogController.getIndex));
router.get("/posts", catchErrors(blogController.getPost));
router.post("/posts", catchErrors(blogController.createPost));
router.get("/posts/:id", catchErrors(blogController.editPost));
router.post("/posts/:id", catchErrors(blogController.updatePost));

module.exports = router;