var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render shelf_view");
    res.render('shelf_view', { title: 'BookAPP', selection: false});
});

module.exports = router;
