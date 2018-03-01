/*

    SmartExpress N2
    Route: Login

 */

var express = require('express');
var router = express.Router();

const TEMPLATE = 'login.html';

const knownUsers = [
    { username: 'alessio', password: 'doctor' },
    { username: 'admin', password: 'admin00' }
];

var isUserKnown = function(user, pwd) {

    console.log('Is user ' + user + ' with pwd=' + pwd + " known?");

    var i;
    for (i = 0; knownUsers.length > i; i += 1) {
        if (knownUsers[i].username === user) {
            if ( knownUsers[i].password === pwd)
                return { loggedIn: true, message: 'OK' };
            else
                return { loggedIn: false, message: 'Password sbagliata' };
        }
    }

    return { loggedIn: false, message: 'Utente sconosciuto' };

};

/* GET login page. */
router.get('/', function(req, res) {

    console.log('Login page GET');

    var error = req.query.error;

    res.render(TEMPLATE, {
        title: 'Login',
        error: error
    });
});


/* POST login page. */
router.post('/', function (req, res) {

    console.log('Login page POST');
    console.log(JSON.stringify(req.body));

    var username = req.body.username;
    var userKnown = isUserKnown(username, req.body.password);
    console.log(JSON.stringify(userKnown));

    if (userKnown.loggedIn) {
        console.log('User is ' + username);
        var sessionData = req.session;
        sessionData.username = username;  // Save username to session
        res.redirect('/home');
    }
    else {
        console.log('Login failed for ' + username);
        console.log('Error: ' + userKnown.message);
        res.redirect('/?error=' + userKnown.message);
    }


});


module.exports = router;

