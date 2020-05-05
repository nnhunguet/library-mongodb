var Session = require('../models/session.model')
var Book = require('../models/book.model');
var Transaction = require('../models/transaction.model');

module.exports.index = async function(req, res) {
  var sessionId = req.signedCookies.sessionId;
  var curSession = await Session.findOne({_id: sessionId});
  var carts = [];
  for(var item of curSession.cart) {
    carts.push({
      book: (await Book.findOne({_id: item.bookId})),
      count: item.quantity
    })
  }
  console.log(carts);
  res.render('cart/index', {
    carts: carts
  });
}

module.exports.post = async function(req, res) {
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId;
  
  var cart = await Session.findOne({_id: sessionId});
  var carts = [];
  for(var item of cart.cart) {
    carts.push(
      { 
        book: (await Book.findOne({_id: item.bookId})),
        count: item.quantity
      }
    )
  }
  for(var cart of carts) {
    var newTransaction = {
    userId: userId.toString(),
    bookId: cart.book._id,
    isComplete: false
    };
    await Transaction.create(newTransaction);
    
  }
  // await transactions.save();
  await Session.findOneAndUpdate({_id: sessionId }, {cart: []});
  res.redirect('/');
}

module.exports.addToCart = async function(req, res) {
  var idBook = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var curSession = await Session.findById(sessionId);
  console.log(curSession);
  // var count = curSession.cart.idBook ?  curSession.cart.idBook : 0;
  
  //await Session.findOneAndUpdate({_id: sessionId}, {
  //  cart : {[idBook]: count +1}
  //})
  for (const item of curSession.cart) {
    if (item.bookId.toString() === idBook) {
      item.quantity++;
      await curSession.save();
      return res.redirect('/book');
    }
  }
  
  curSession.cart.push({
    bookId: idBook,
    quantity: 1,
  });
  await curSession.save();
  return res.redirect('/book');
}