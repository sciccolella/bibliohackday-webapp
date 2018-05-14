var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render book_view");
    res.render('book_view', { title: 'BookAPP', selection: false});
});

module.exports = router;
