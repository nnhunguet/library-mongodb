var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'nnhungcoderx', 
  api_key: '874846159413379', 
  api_secret: 'LnPTZP8dDOKQVlIup17uxKACmto' 
});

var Book = require('../models/book.model')
module.exports.index = async function(req, res){
  var books = await Book.find();
  // res.json(books)
  res.render('book/index', {
    books: books
  });
};

module.exports.search = async function(req, res) {
  var q = req.query.q;
  var books = await Book.find();
  var searchBooks = books.filter(function(book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  }); 
  res.render('book/index', {
    books: searchBooks,
    value: q
  })
};

module.exports.delete = async function(req, res){
  var id = req.params.id;
  await Book.deleteOne({_id: id});
  res.redirect('/book');
};

module.exports.update = function(req, res){
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('book/update', {
    book: book
  });
};

module.exports.postUpdate = async function(req, res) {
  var id = req.params.id;
  var input = req.body.title;
  await Book.findByIdAndUpdate({_id: id}, {title: input});
  res.redirect('/book');
};

module.exports.create = async function(req, res) {
  // var modelBook = require('../models/book.model');
  var book = new Book();
  var file = req.files.coverUrl;
  cloudinary.uploader.upload(file.tempFilePath, 
    function(error, result) {
      book.title = req.body.title;
      book.desc = req.body.desc;
      book.image = result.url;
      book.save()
  });
  res.redirect('/book');
};

module.exports.view = async function(req, res) {
  var id = req.params.id;
  var book = await Book.findOne({_id: id})
  res.render('book/view', {
    book: book
  });
};