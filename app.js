var createError = require('http-errors');
var express = require('express');

//Connect to back4App Database
var Parse=require('parse/node');
Parse.initialize('masEBrhZI5JwJU1Lf9LMFhYLTiXPg7bkAE6PcccG', 'tG3CaQkwOnWf1UkhzL4c7IJBssyq2foLNHkuD79I');
Parse.serverURL = 'https://parseapi.back4app.com';

const fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const NodeCache = require('node-cache')
module.exports.myCache = new NodeCache();

var indexRouter = require('./routes/index');
var central_router = require('./routes/central_router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload({
  createParentPath: true,
  safeFileNames:true
  }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/route', central_router)



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
