const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const blogSchema = mongoose.Schema({ 
  author: {
    type: String,
    required: 'Please tell us your name great Trainer..',
    trim: true
  },
  post: {
    type: String,
    required: 'Tell us about your most recent adventure'
  },
  slug: String,  
});

blogSchema.pre('save', function (next) {
  if (!this.isModified('author')) {
    next();
    return;
  }
  this.slug = slug(this.author);
  next();
});

module.exports = mongoose.model('Blog', blogSchema);