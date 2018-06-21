/*

    SmartExpress N2
    Node.js initializer

 */

// Required libraries
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cfenv = require("cfenv");
const nunjucks  = require('nunjucks');

// Routes
const login = require('./routes/login');
const home = require('./routes/home');
const reports = require('./routes/reports');
const api = require('./routes/api');

// Http Server
const app = express();

// Bluemix VCAP
let vcapLocal;
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
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(session({
    secret: 'axsaxs',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Navigation routes
app.use('/', login);
app.use('/home', home);
app.use('/reports', reports);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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

app.listen(3000, function () {
  console.log('Smart Express is running...');
  if (!process.env.VCAP_SERVICES)
  {
      console.log('http://localhost:3000');
  }
});

module.exports = app;