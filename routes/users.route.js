var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller');
var middlewareUser = require('../middlewares/user.middleware');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', middlewareUser.postCreate, controller.postCreate);

router.get('/profile/:id', controller.profile);

router.get('/profile/avatar/:id', controller.getAvatar);

router.post('/profile/avatar/:id', controller.postAvatar);

// router.get('/:id', function(req, res) {
//   var id = req.params.id;
//   var user = db.get('users').find( {id: id}).value();
//   res.render('methodBook/index', {
//     user: user
//   });
// });

// router.get('/borrow/:id', function(req, res) {
//   var idUser = req.params.id;
//   res.render('methodBook/borrow', {
//     books: db.get('books').value(),
//     idUser: idUser
//   })
// });

// router.get('/borrowed/:id', function(req, res) {
//   var idUser = req.params.id;
  
// })

module.exports = router;