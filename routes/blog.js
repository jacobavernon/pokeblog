var express = require("express");
var router = express.Router();
var blogController = require("../controllers/blogController");
const { catchErrors } = require('../handlers/errorHandlers')

// This is our blog http requests
router.get("/", catchErrors(blogController.getIndex));
router.get("/posts", catchErrors(blogController.getPost));
router.post("/posts", catchErrors(blogController.createPost));
router.post("/posts/delete/:id", catchErrors(blogController.deletePost));
router.get("/posts/:id", catchErrors(blogController.editPost));
router.post("/posts/:id", catchErrors(blogController.updatePost));

module.exports = router;