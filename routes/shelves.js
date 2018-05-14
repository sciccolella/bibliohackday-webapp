var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render shelves");
    token = req.cookies.token;
    if (token === null) {
        console.log('Not logged in');
        res.render('shelves', { title: 'BookAPP', logged: false});
    } else {
        console.log(token);
          request.get(
            API_URL + '/shelves',
            {headers: {token: req.cookies.token,
                        latitude: 45.5246,
                        longitude: 9.21732}},
            function (error, ext_res, body) {
                let r = JSON.parse(ext_res.body);
                console.log(r);
                if (!error && ext_res.statusCode == 200) {
                    res.render('shelves', { title: 'BookAPP', logged: true, 
                                data: r.objects
                            });
                } else {
                    console.log('error');
                    res.render('shelves', { title: 'BookAPP', logged: false});
                }
            }
        );
    }
});

module.exports = router;
