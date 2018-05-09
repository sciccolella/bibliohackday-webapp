var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render shelves");
    res.render('shelves', { title: 'BookAPP'});
});

module.exports = router;
