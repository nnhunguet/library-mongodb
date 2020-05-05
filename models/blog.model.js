mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String
});

var Blog = mongoose.model('Blog', blogSchema, 'blogs');

module.exports = Blog;