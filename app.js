/*

    A2A N2
    Node.js initializer

 */

'use strict';

// Required libraries
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cfenv = require("cfenv");
var nunjucks  = require('nunjucks');

// Routes
var login = require('./routes/login');
var home = require('./routes/home');
var api = require('./routes/api');

// Http Server
var app = express();

// Bluemix VCAP
var vcapLocal;
try {
    vcapLocal = require('./vcap-local.json');
    console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }
const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {};
const appEnv = cfenv.getAppEnv(appEnvOpts);

// View Engine: Nunjucks
app.set('view engine', 'nunjucks');
nunjucks.configure(app.get('views'), {
    autoescape: true,
    noCache: true,
    watch: true,
    express: app
});

// App usage
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(session({
    secret: 'axsaxs',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Navigation routes
app.use('/', login);
app.use('/home', home);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // logs error
  console.log('ERROR:');
  console.log(err.status+"> "+ err.message);

  res.status(err.status || 500);

});

module.exports = app;
