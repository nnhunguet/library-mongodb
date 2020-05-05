var Book = require('../../models/book.model');

module.exports.index = async function(req, res) {
    var books = await Book.find();
    res.json(books);
}