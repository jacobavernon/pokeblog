const pokeBlogs = {};

exports.getIndex = function(req, res) {
  res.render("blog");
};

exports.getPost = function(req, res, next) {
  // Does our pokeBlogs object contain the requested author?
  if (pokeBlogs[req.params.author]) {
    res.render("posts", {
      author: req.params.author,
      body: pokeBlogs[req.params.author].post
    });
  } else {
    next();
  }
};

exports.createPost = function(req, res) {
  const { author, post } = req.body;

  pokeBlogs[author] = { post };

  res.render("posts", {
    author: req.body.author,
    body: req.body.post
  });
};