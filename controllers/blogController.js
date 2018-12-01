const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

exports.getIndex = function(req, res) {
  res.render("blog", { title: "Datte-Bayo!" }); //added title text -Jacob
};


exports.createPost = async (req, res) => {
  const blog = await (new Blog(req.body)).save();
  await blog.save();
  req.flash('success', 'you have successfully created this blog post')
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
  const blog = await Blog.findOne({_id: req.params.id});
  res.render('individualPost', { blog })
};

exports.updatePost = async (req, res) => {
  const blog = await Blog.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', 'you have successfully created this blog post')
  res.redirect(`/blog/posts`)
}