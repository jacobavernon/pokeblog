var express = require('express');
var router = express.Router();

const pokeBlogs = {
  author: 'marquitos',
  body: 'I caught a mew today!'
}

// This is our blog 
router.get('/', (req, res, next) => {
  res.render('blog')
})

router.post('/posts', (req, res, next) => {
  var pokeBlog = {
    author: req.body.author,
    body: req.body.post,
  }
  res.send(pokeBlog.author + pokeBlog.body)
  next();
})

router.get('/posts', (req, res, next) => {
  res.render('posts', {
  })
})

module.exports = router;