var express = require('express');
var router = express.Router();

var controller = require('../controllers/book.controller');


router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/delete/:id', controller.delete)

router.get('/update/:id', controller.update);

router.post('/updateTitle/:id', controller.postUpdate);

router.get('/create', function(req, res) {
  res.render('book/create')
});

router.post('/create', controller.create);

router.get('/view/:id', controller.view);

module.exports = router;