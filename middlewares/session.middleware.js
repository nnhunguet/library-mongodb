var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
  try {
    // var a;
    // a.b();
    if(!req.signedCookies.sessionId) {
      // console.log(req.signedCookies);
      var sessionId = await Session.create({});
      res.cookie('sessionId', sessionId._id, {
          signed: true
        });
    }
  } catch (err) {
    res.render('error.pug');
  }
  

  // var carts = (await Session.findOne({_id: req.signedCookies.sessionId})).cart;
  // var count = 0;
  // for(var item of carts) {
  //   count += item.quantity; 
  // }
  
  // res.locals.count = count ;
  
  next();
}