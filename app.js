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
const nunjucks  = require('nunjucks');
const logger = require('winston');

// Routes
const login = require('./routes/login');
const home = require('./routes/home');
const reports = require('./routes/reports');
const api = require('./routes/api');

// Http Server
const app = express();

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

app.listen(3000, function () {
  logger.info('Smart Express v.' + jsonPackage.version);
  logger.info('Running on http://localhost:3000');
});

module.exports = app;
