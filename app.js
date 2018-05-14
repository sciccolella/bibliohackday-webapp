var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var forward = require('http-port-forward');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var booksRouter = require('./routes/books');
var shelvesRouter = require('./routes/shelves');
var reservationsRouter = require('./routes/reservations');
var historyRouter = require('./routes/history');
var profileRouter = require('./routes/profile');
var book_viewRouter = require('./routes/book_view');
var shelf_viewRouter = require('./routes/shelf_view');

API_URL = "http://18.222.10.130:5000/api/v1";

AUTH_TOKEN = null;

var upload = multer();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/books', booksRouter);
app.use('/shelves', shelvesRouter);
app.use('/reservations', reservationsRouter);
app.use('/history', historyRouter);
app.use('/profile', profileRouter);
app.use('/book_view/', book_viewRouter);
app.use('/shelf_view/', shelf_viewRouter);

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.post('/login', function(req, res){
  console.log(req.body);
  
  request.post(
    API_URL + '/login',
    {form: {email: req.body.email, password: req.body.password}},
    function (error, ext_res, body) {
      let r = JSON.parse(ext_res.body);
      console.log(r);
      if (!error && ext_res.statusCode == 202) {
        AUTH_TOKEN = r.token;
        console.log(AUTH_TOKEN)
        res.cookie('token', r.token);
        res.redirect('books');
      } else {
        console.log('error');
        res.render('login', {title: 'Login', error: r.message});
      }
    }
  );
});

app.post('/signup', function(req, res){
  console.log(req.body);
  
  request.post(
    API_URL + '/users',
    {form: {name: req.body.name, 
            surname: req.body.surname,
            email: req.body.email, 
            password: req.body.password}},
    function (error, ext_res, body) {
      let r = JSON.parse(ext_res.body);
      console.log(r);
      if (!error && ext_res.statusCode == 201) {
        console.log('success');
        res.render('signup', {title: 'Signup', success: r.message});
      } else {
        console.log('error');
        res.render('signup', {title: 'Signup', error: r.message});
      }
      
    }
  );
});

app.post('/books', function(req, res){
  console.log(req.body);
  
  request.get(
    API_URL + '/books',
    {headers: {token: req.cookies.token, 
          latitude: 45.5241, 
          longitude: 9.21730, 
          title: req.body.search_input }},
    function (error, ext_res, body) {
      let r = JSON.parse(ext_res.body);
      console.log(r);
      if (!error && ext_res.statusCode == 200) {
        console.log(r.objects[0]);
        res.render('books', {title: 'Book', search: true, data: r.objects});
      } else {
        console.log('error');
        res.render('books', {title: 'Book', error: r.message});
      }
    }
  );
});

app.post('/book_view', function (req, res) {
  console.log(req.body);

  request.get(
    API_URL + '/books/' + req.body.selection,
    {headers: {token: req.cookies.token}},
    function (error, ext_res, body) {
      console.log(ext_res)
      let r = JSON.parse(ext_res.body);
      console.log(r);
      if (!error && ext_res.statusCode == 200) {
        console.log(r.objects[0]);
        res.render('book_view', {title: 'Book', selection: req.body.selection, data: r.objects[0]});
      } else {
        console.log('error');
        res.render('book_view', {title: 'Book', error: r.message});
      }
    }
  );
})

app.post('/shelf_view', function (req, res) {
  console.log(req.body);

  request.get(
    API_URL + '/shelves/' + req.body.selection,
    {headers: {token: req.cookies.token}},
    function (error, ext_res, body) {
      console.log(ext_res.body)
      let r = JSON.parse(ext_res.body);
      console.log(r);
      if (!error && ext_res.statusCode == 200) {
        console.log(r.objects[0]);
        res.render('shelf_view', {title: 'Shelf', selection: req.body.selection, data: r.objects});
      } else {
        console.log('error');
        res.render('shelf_view', {title: 'Shelf', error: r.message});
      }
    }
  );
})

module.exports = app;
