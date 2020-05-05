var express = require('express');
var router = express.Router();

var controller = require('../controllers/transaction.controller');
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/create', controller.create);
router.post('/create', controller.postCreate);
router.get('/:id/complete', controller.complete);

module.exports = router;