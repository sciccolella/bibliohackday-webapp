var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render profile");
    res.render('profile', { title: 'BookAPP'});
});

module.exports = router;
