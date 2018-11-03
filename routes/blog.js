var express = require('express');
var router = express.Router();

const pokeBlogs = {}

// This is our blog 
router.get('/', (req, res) => {
  res.render('blog')
})

router.post('/posts', (req, res) => {
  const { author, post } = req.body;
  pokeBlogs[author] = { post };

  res.render('posts', {
    author: req.body.author,
    body: req.body.post
  })
})

router.get('/posts/:author', (req, res, next) => {
  // Does our pokeBlogs object contain the requested author?
  if (pokeBlogs[req.params.author]) {
    res.render('posts', { author: req.params.author, body: pokeBlogs[req.params.author].post })
  } else {
    next();
  }
})

module.exports = router;