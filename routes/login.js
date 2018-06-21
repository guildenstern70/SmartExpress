/*

    SmartExpress N2
    Route: Login

 */

const express = require('express');
const router = express.Router();

const TEMPLATE = 'login.html';

const knownUsers = [
    { username: 'alessio', password: 'doctor' },
    { username: 'admin', password: 'admin00' }
];

const isUserKnown = function(user, pwd) {

    console.log('Is user ' + user + ' with pwd=' + pwd + " known?");

    for (let i = 0; knownUsers.length > i; i += 1) {
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

    const error = req.query.error;

    res.render(TEMPLATE, {
        title: 'Login',
        error: error
    });
});


/* POST login page. */
router.post('/', function (req, res) {

    console.log('Login page POST');
    console.log(JSON.stringify(req.body));

    const username = req.body.username;
    const userKnown = isUserKnown(username, req.body.password);
    console.log(JSON.stringify(userKnown));

    if (userKnown.loggedIn) {
        console.log('User is ' + username);
        const sessionData = req.session;
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

