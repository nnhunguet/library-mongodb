var express = require('express');
var router = express.Router();

var controller = require('../controllers/transaction.controller');

router.get('/transactions', controller.index);

module.exports = router;