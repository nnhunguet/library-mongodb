mongoose = require('mongoose');

var transcationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  isComplete: Boolean
});

var Transaction = mongoose.model('Transaction', transcationSchema, 'transactions');

module.exports = Transaction;