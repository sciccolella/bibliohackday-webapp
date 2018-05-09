var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render books");
    res.render('books', { title: 'BookAPP'});
});

module.exports = router;
