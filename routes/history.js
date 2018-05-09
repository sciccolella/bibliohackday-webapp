var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render history");
    res.render('history', { title: 'BookAPP'});
});

module.exports = router;
