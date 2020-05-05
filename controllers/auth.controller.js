const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.login = function(req, res) {
  res.render('user/login');
};

module.exports.postLogin = async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne( {email: email} );  
  console.log(user);
  if(!user) { 
    res.render('user/login', {
      errors: [
        'User not exit'
      ],
      email: email
    });
    return;
  }
  
  if(user.wrongLoginCount===4) {
    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // console.log(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'nghiahunguet@gmail.com',
      subject: 'Wrong PassWord',
      text: 'Hey Bro!!!!!!!!!!!!!',
      html: '<strong> Ông nhập sai mật khẩu vừa vừa thôi =.= </strong> <a href="https://coders-x.com/"> Đổi pass ở đây</a>',
    };
    sgMail
      .send(msg)
      .then((res) => {
        console.log(res);
      }, error => {
        console.error(error);

    if (error.response) {
        console.error(error.response.body)
      }
    });
    res.render('user/login', {
      errors: [
        'Wrong Hash Password Because You Comfirm PassWord Wrong 4 times in a row'
      ]
    });
    return;
  }
  var result = false;  
  bcrypt.compare(password, user.password, function(err, result) {
    // result == true
    result = result;
    if(!result) {
      User.findOneAndUpdate( { email: email }, { wrongLoginCount: 1 });
      res.render('user/login', {
        errors: [
          'Wrong PassWord'
        ],
        email: email
      });
    } 
    else 
      {
        // db.get('users').find({ id: user.id}).update('wrongLoginCount', n => 0).write();
        res.cookie('userId', user.id, {
          signed: true
        });
        res.redirect('/user/profile/'+user.id);
      }
  });
  if(!result) {
    return;
  }
};