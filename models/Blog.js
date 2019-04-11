const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const blogSchema = mongoose.Schema({
  photo: String,
  created: {
    type: Date,
    default: Date.now
  },
  trainer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    type: String,
    required: 'Please tell us your name great Trainer..',
    trim: true
  },
  post: {
    type: String,
    required: 'Tell us about your most recent adventure',
  },
  slug: String
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