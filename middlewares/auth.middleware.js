var User = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next) {
  if(!req.signedCookies.userId) {
    res.redirect('/user/login');
    return;
  }
  
  var user = await User.findOne({_id: req.signedCookies.userId});
  var errors = [];
  if(!user.email) {
    errors.push('Name is not required');
    res.redirect('/user/login');
    return;
  }
  next();
}