var express = require('express');
var router = express.Router();

var controller = require('../controllers/book.controller');

router.get('/books', controller.index);

module.exports = router;