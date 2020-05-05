mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  cart: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    quantity: Number,
  }]
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;