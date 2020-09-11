/*

    SmartExpress N2
    Route: Home

 */

const express = require('express');
const logger = require('winston');
const ca = require('./authorization');

const router = express.Router();

const TEMPLATE = 'home.html';

const sessionUser = function(req) {
    logger.info('Retrieving session data...');
    const user = req.session.login.fullname; // Get username from session
    logger.info('User is ' + user);

    return user;
};

/* GET home page. */
router.get('/', ca.checkAuth, function(req, res) {
    logger.info('Home page GET');

    const context = {
        title: 'Home',
        username: sessionUser(req),
    };

    res.render(TEMPLATE, context);
});

module.exports = router;
