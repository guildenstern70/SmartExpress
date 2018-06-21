/*

    SmartExpress N2
    Route: Home

 */

const express = require('express');
const router = express.Router();

const TEMPLATE = 'home.html';

const sessionUser = function (req) {

    console.log('Retrieving session data...');
    const user = req.session.username; // Get username from session
    console.log('User is ' + user);

    return user;
};

/* GET home page. */
router.get('/', function(req, res) {

    console.log('Home page GET');

    const context = {
        title: "Home",
        username: sessionUser(req)
    };

    res.render(TEMPLATE, context);
});

module.exports = router;
