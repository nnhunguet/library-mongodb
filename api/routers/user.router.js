var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller');

router.post('/login', controller.postLogin);
router.get('/users/:id', controller.index);

module.exports = router;