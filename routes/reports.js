/*

    SmartExpress N2
    Route: Home

 */

var express = require('express');
var request = require('request');

var router = express.Router();

const TEMPLATE = 'reports.html';
const REPORTS_WS_URL = 'http://localhost:3000/api/v1/reportsdata';

/* DELETE report page. */
router.get('/deleterecord', function (req, res) {

    var id = req.query.id;

    if (id) {

        var url = REPORTS_WS_URL+"?id="+id;

        // Call WS asynchronously
        request.delete(url, {json: true}, function (err, wsres) {

            if (err) {
                console.log('ERROR: ' + err);
                console.log(JSON.stringify(wsres));
                return;
            }

            console.log('Ok received > ' + JSON.stringify(wsres.body));
            res.redirect('/');
        });

    }
    res.redirect('/');
});

/* GET reports page. */
router.get('/', function (req, res) {

    // Call WS asynchronously
    request.get(REPORTS_WS_URL, {json: true}, function (err, wsres) {

        if (err) {
            console.log('ERROR: ' + err);
            console.log(JSON.stringify(wsres));
            return;
        }

        console.log('Ok received > ' + JSON.stringify(wsres.body));

        var context = wsres.body;
        context.title = "Reports";
        context.username = req.session.username;

        res.render(TEMPLATE, context);
    });


});

module.exports = router;
