var Transaction = require('../../models/transaction.model');
var User = require('../../models/transaction.model');

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
    res.json(transformedTransactions);
  }