var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render login");
    res.render('login', { title: 'Login', error: null});
});

module.exports = router;
