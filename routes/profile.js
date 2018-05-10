var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render profile");
    token = req.cookies.token;
    if (token === null) {
        console.log('Not logged in');
        res.render('profile', { title: 'BookAPP', logged: false});
    } else {
        console.log(token);
          request.get(
            API_URL + '/users',
            {headers: {token: req.cookies.token}},
            function (error, ext_res, body) {
                let r = JSON.parse(ext_res.body);
                console.log(r);
                if (!error && ext_res.statusCode == 200) {
                    res.render('profile', { title: 'BookAPP', logged: true, 
                                data: r.objects[0]
                            });
                } else {
                    console.log('error');
                    res.render('profile', { title: 'BookAPP', logged: false});
                }
            }
        );
    }
});

module.exports = router;
