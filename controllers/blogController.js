const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

exports.getIndex = function(req, res) {
  res.render("blog", { title: "Datte-Bayo!" }); //added title text -Jacob
};

exports.deletePost = async (req, res) => {
  await Blog.findOneAndDelete({ _id: req.params.id}, req.body
  ).exec();
  res.redirect('/blog/posts')
};

exports.createPost = async (req, res) => {
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

exports.editPost = async (req, res) => {
  const blog = await Blog.findOne({_id: req.params.id });
  res.render('blog', { blog })
};

exports.updatePost = async (req, res) => {
  const blog = await Blog.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.redirect(`/blog/posts`)
};