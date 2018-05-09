var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render signup");
    res.render('signup', { title: 'Signup', error: null, success: null});
});

module.exports = router;
