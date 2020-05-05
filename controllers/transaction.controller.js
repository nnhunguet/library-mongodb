var User = require('../models/user.model');
var Transaction = require('../models/transaction.model');
var Book = require('../models/book.model');
module.exports.index = async function(req, res) {
  var isAdmin;
  var id = req.signedCookies.userId;
  if(await User.findOne({_id:id}).isAdmin) {
    isAdmin = true;
  }
  
  var transactions = await Transaction.find().populate('userId bookId');
  var transformedTransactions = transactions.map(item => {
    return {
      id: item._id,
      user: item.userId.name,
      book: item.bookId.title,
      isComplete: item.isComplete
    }
  });
  res.render('transaction/index', {
    showTransactions: transformedTransactions,
    isAdmin: isAdmin
  });
}

module.exports.create = async function(req, res) {
  var users = await User.find();
  var books = await Book.find();
  res.render('transaction/create', {
    users: users,
    books: books
  });
}

module.exports.postCreate = async function(req, res) {
  var newTransaction = {
    userId: req.body.user,
    bookId: req.body.book,
    isComplete: false
  };

  await Transaction.create(newTransaction);
  res.redirect('/');
}


module.exports.complete = async function(req, res) {
  let id = req.params.id;
  if(Transaction.findById({id})) {
    await Transaction.findOneAndUpdate({_id: id}, {isComplete: true});
  }
  res.redirect('/');
}