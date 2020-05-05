var express = require('express');
var router = express.Router();

var controller = require('../controllers/blog.controller');

router.get('/', controller.index);

module.exports = router;