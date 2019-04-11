var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var errorHandlers = require('./handlers/errorHandlers');
var promisify = require('es6-promisify');
var flash = require('connect-flash');
var expressValidator = require('express-validator'); //applies a bunch of validation methods to make sure users are signing up correctlynp
var config = require('./config/database')
var passport = require('passport');
var helpers = require('./helpers');

var indexRouter = require('./routes/index');
var pokemonRouter = require('./routes/pokemon');
var blogRouter = require('./routes/blog')
var trainersRouter = require('./routes/trainers')

var app = express();

// Favicon setup
app.use(favicon(path.join(__dirname, 'public/images/favicons', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));

// View engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(flash()); // express connect flash middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// express session middleware
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: true,
  saveUninitialized: false,
  blog: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Express validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(function (req, res, next) {
  res.locals.h = helpers
  res.locals.flashes = req.flash();
  res.locals.currentPath = req.path;
  next();
});

app.use('/', indexRouter);
app.use('/pokemon', pokemonRouter);
app.use('/blog', blogRouter);
app.use('/trainers', trainersRouter);

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Passport Cofiguration
require('./config/passport')(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;