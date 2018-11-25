var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var favicon = require('serve-favicon');
var indexRouter = require('./routes/index');
var pokemonRouter = require('./routes/pokemon');
var blogRouter = require('./routes/blog')
var trainersRouter = require('./routes/trainers')

var app = express();

// view engine setup
app.use(favicon(path.join(__dirname, 'public/images/favicons', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/pokemon', pokemonRouter);
app.use('/blog', blogRouter);
app.use('/trainers', trainersRouter);

//app.listen(3000);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
