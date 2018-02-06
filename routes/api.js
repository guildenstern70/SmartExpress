/*

    A2A N2
    Route: API

 */

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/version', function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ version: "0.1.0" }));
});

module.exports = router;