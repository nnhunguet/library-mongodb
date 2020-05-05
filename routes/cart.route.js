var express = require('express');
var router = express.Router();

var controller = require('../controllers/cart.controller');
var middlewareAuth = require('../middlewares/auth.middleware');

router.get('/add/:bookId', controller.addToCart);

router.get('/', middlewareAuth.requireAuth, controller.index);

router.post('/', controller.post);

module.exports = router;