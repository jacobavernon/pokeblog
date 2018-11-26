const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

const pokeBlogs = {};

exports.getIndex = function(req, res) {
  res.render("blog", { title: "Datte-Bayo!" }); //added title text -Jacob
};

exports.createPost = async (req, res) => {
  console.log(req.body)
  const blog = await (new Blog(req.body)).save();
  await blog.save();
  res.redirect('/blog/posts')
};

exports.getPost = async (req, res) => {
  const posts = await Blog.find();
  res.render('posts', { 
    title: 'Posts',
    posts
})
};

