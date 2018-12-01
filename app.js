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
const helpers = require('./helpers');
const promisify = require('es6-promisify');


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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/pokemon', pokemonRouter);
app.use('/blog', blogRouter);
app.use('/trainers', trainersRouter);

//app.listen(3000);
// catch 404 and forward to error handler
// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors

app.use(errorHandlers.notFound);


app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  useNewUrlParser: true,
  blog: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (app.get('env') == 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
};
app.use((req, res, next) => {
   res.locals.h = helpers;
 });

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandlers.productionErrors);

module.exports = app;