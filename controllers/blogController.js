const mongoose = require('mongoose');
const User = mongoose.model('User');
const Blog = mongoose.model('Blog');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if(isPhoto) {
      console.log(req.file)
      next(null, true);
    } else {
      next({
        msg: 'That file type is not allow'
      }, false)
    }
  }
};

exports.upload = multer(multerOptions).single('photo'); 

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  } else {
    const extension = req.file.mimetype.split('/')[1]
    req.body.photo = `${uuid.v4()}.${extension}`;
    const photo = await jimp.read(req.file.buffer)
    await photo.resize(140, jimp.AUTO);
    await photo.write(`public/uploads/${req.body.photo}`)
    next();
  }
};

exports.getIndex = function (req, res) {
  res.render("blog", { title: "Datte-Bayo!" }); //added title text -Jacob
};


exports.deletePost = async (req, res, result) => {
  await Blog.findOneAndDelete({ _id: req.params.id }, req.body
  ).exec();
    req.flash('success', 'you have successfully deleted this post')
    res.redirect('/blog/posts')
};


exports.createPost = async (req, res) => {
  const blog = await (new Blog(req.body)).save();
    req.flash('success', 'You have successfully created this post :)')
    res.redirect('/blog/posts')
  }

exports.getPost = async (req, res) => {
  const posts = await Blog.find();
  res.render('posts', {
    posts
  })
};

exports.editPost = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  res.render('blog', { blog })
};

exports.updatePost = async (req, res) => {
  const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, req.file, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', 'you have successfully updated this post')
  res.redirect(`/blog/posts`)
};

exports.registerView = (req, res) => {
  res.render('register', { title: 'pokeRegister' })
}

exports.login = (req, res) => {
  res.render('login', { title: 'Login' })
}

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blog/posts', 
    failureRedirect: '/blog/login',
    failureFlash: true
  })(req, res, next);
};

exports.register = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const trainer = req.body.trainer
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  req.checkBody('name', 'Name is required.').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('trainer', 'trainer is required').notEmpty()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password)

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors
    });
  } else {
    let newUser = new User({
      name,
      email,
      trainer,
      password
    });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (error, hash) {
        if (error) {
          console.log(error)
        }
        newUser.password = hash;
        newUser.save(function (error) {
          if (error) {
            console.log(error)
            return
          } else {
            res.redirect('/blog/login')
          }
        })
      });
    });
  }
};
