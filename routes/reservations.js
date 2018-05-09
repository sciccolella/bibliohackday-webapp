var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render reservations");
    res.render('reservations', { title: 'BookAPP'});
});

module.exports = router;
