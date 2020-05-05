module.exports.postCreate = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var errors = [];

  if(!name) {
    errors.push('Name is not required');
  }

  if(!email) {
    errors.push('Email is not required');
  }
  
  if(!password) {
    errors.push('Password is not required');
  }

  res.locals.name = name;
  res.locals.email = email;
  res.locals.password = password;
  res.locals.errors = errors;

  next();
}