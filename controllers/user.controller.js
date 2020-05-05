var User = require('../models/user.model');

var cloudinary = require('cloudinary').v2;
var fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const saltRounds = 10;

cloudinary.config({ 
  cloud_name: 'nnhungcoderx', 
  api_key: '874846159413379', 
  api_secret: 'LnPTZP8dDOKQVlIup17uxKACmto' 
});



module.exports.index = function(req, res) {
  if(req.signedCookies.userId) {
    res.redirect('user/profile/' + req.signedCookies.userId);
    return;
  }
  res.render('user/index');
};

module.exports.create = function(req, res) {
  res.render('user/create')
};

module.exports.postCreate = function(req, res) {
  var name = res.locals.name;
  var email = res.locals.email;
  var password = res.locals.password;
  var errors = res.locals.errors;
  
  if(errors.length > 0) {
    res.render('user/create', {
      errors: errors,
      email: email,
      name: name
    })
    return;
  }
  
  bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
    var hash = hash;
      var newUser = {
      name: name,
      email: email,
      password: hash,
      wrongLoginCount: 0,
      avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
    };

    User.create(newUser);
  });
  console.log('1');
  res.redirect('/user/login');
}; 

module.exports.profile = async function(req, res) {
  var id = req.params.id;
  var user = await User.findOne( {_id: id} );
  res.render('user/profile', {
    user: user
  });
};

module.exports.getAvatar = async function(req , res) {
  var id = req.params.id;
  var user = await User.findOne({_id:id})
  res.render('user/avatar', {
    user: user
  });
}

module.exports.postAvatar = async function(req, res) {
  var id = req.params.id;
  var file = req.files.avatar;
  cloudinary.uploader.upload(file.tempFilePath, 
    async function(error, result) {
      await User.findOneAndUpdate({_id:id}, {avatar: result.url});
    });
  res.redirect('/user/profile/'+id);
}


