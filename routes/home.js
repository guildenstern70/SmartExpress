/*

    A2A N2
    Route: Home

 */

var express = require('express');
var router = express.Router();

const TEMPLATE = 'home.html';

var sessionUser = function (req) {

    console.log('Retrieving session data...');
    var user = req.session.username; // Get username from session
    console.log('User is ' + user);

    return user;
};

/* GET home page. */
router.get('/', function(req, res) {

    console.log('Home page GET');

    var context = {
        title: "Home",
        username: sessionUser(req)
    };

    res.render(TEMPLATE, context);
});

module.exports = router;
