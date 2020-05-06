var express = require('express');
var router = express.Router();

var controller = require('../controllers/session.controller');

router.get('/sessions', controller.index);

module.exports = router;