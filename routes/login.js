/*

    SmartExpress N2
    Route: Login

 */

const express = require('express');
const logger = require('winston');
const request = require('request');
const constants = require('./constants');
const packagejson = require('../package.json');

const router = express.Router();

const TEMPLATE = 'login.html';
const LOGIN_URL = constants.WS_URL + '/users/login';

const sessionData = {
    username: '',
    userid: -1,
    fullname: '',
};

const login = function(req, res) {
    const loginObj = req.body;
    logger.info('Checking login for ' + JSON.stringify(loginObj));
    logger.info('Calling WS at ' + LOGIN_URL);

    const jsonRequest = {
        username: loginObj.username,
        password: loginObj.password,
    };

    const options = {
        method: 'post',
        body: jsonRequest,
        json: true,
        url: LOGIN_URL,
    };

    // Call login web service (LOGIN_URL)
    request(options, function(err, httpResponse, body) {
        if (err) {
            logger.error(err);
            res.redirect('/login?error=' + err);
        } else {
            logger.info(
                'Received HTTP response: ' + JSON.stringify(httpResponse)
            );
            if (httpResponse.statusCode === 200) {
                const responseObject = httpResponse;
                sessionData.username = responseObject.body.username;
                sessionData.fullname =
                    responseObject.body.nome +
                    ' ' +
                    responseObject.body.cognome;
                sessionData.userid = responseObject.body.utentiID;
                logger.info('Welcome ' + sessionData.fullname);
                const httpSession = req.session;
                httpSession.login = sessionData; // Save to session
                if (loginObj.target) {
                    logger.info('Redirecting to ' + loginObj.target);
                    res.redirect(loginObj.target);
                } else {
                    logger.info('Unknow target. Redirecting to home');
                    res.redirect('/');
                }
            } else {
                const error = 'Utente sconosciuto';
                logger.info(error);
                res.redirect('/login?error=' + error);
            }
        }
    });
};

/* GET login page. */
router.get('/', function(req, res) {
    logger.info('Login page GET');
    const error = req.query.error;
    const version = packagejson.version;
    let targetUrl = '/';
    if (req.query.target) {
        logger.info('Asking for URL = ' + req.query.target);
        targetUrl = req.query.target;
    }
    res.render(TEMPLATE, {
        title: 'Login',
        version,
        targetUrl,
        error,
    });
});

/* POST login page. */
router.post('/', function(req, res) {
    logger.info('Login page POST');
    logger.info(JSON.stringify(req.body));
    login(req, res);
});

module.exports = router;
