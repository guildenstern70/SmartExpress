/*

    SmartExpress N2
    Node.js initializer

 */

const jsonPackage = require('./package.json');

// Required libraries
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cfenv = require('cfenv');
const nunjucks  = require('nunjucks');
const logger = require('winston');

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
    logger.info('Loaded local VCAP', vcapLocal);
} catch (e) {
    logger.error(e.toString());
}
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

// Set logger properties
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {'timestamp': true , 'colorize': true});

// App usage
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
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
app.use('/', home);
app.use('/login', login);
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
  logger.info('ERROR:');
  logger.info(err.status+'> '+ err.message);

  res.status(err.status || 500);

});

app.listen(3000, function () {
  logger.info('Smart Express v.' + jsonPackage.version);
  if (!process.env.VCAP_SERVICES)
  {
      logger.info('Running on http://localhost:3000');
  }
});

module.exports = app;
