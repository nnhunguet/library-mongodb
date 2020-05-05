var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');

router.get('/user/login', controller.login);

router.post('/user/login', controller.postLogin);

module.exports = router;