mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String
});

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;