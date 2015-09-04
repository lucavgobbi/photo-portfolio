var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
appConfig = require('./config');


var web = require('./routes/web');
var albums = require('./routes/albums');
var photos = require('./routes/photos');
var users = require('./routes/users');
var portfolios = require('./routes/portfolios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to mongodb
mongoose.connect('mongodb://' + appConfig.mongoDb.user + ':' + appConfig.mongoDb.password +
    '@' + appConfig.mongoDb.server + ':' + appConfig.mongoDb.port + '/' + appConfig.mongoDb.databaseName);

// All the routes are described here

// These are the api routes
app.use('/api/albums', albums);
app.use('/api/photos', photos);
app.use('/api/users', users);
app.use('/api/portfolios', portfolios);

// These are the views routes used by Angular
app.use('/', web);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
