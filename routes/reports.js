/*

    SmartExpress N2
    Route: Home

 */

const express = require('express');
const request = require('request');
const logger = require('winston');
const ca = require('./authorization');

const router = express.Router();

const TEMPLATE = 'reports.html';
const REPORTS_WS_URL = 'http://localhost:3000/api/v1/reportsdata';

/* DELETE report page. */
router.get('/deleterecord', ca.checkAuth, function(req, res) {
    const id = req.query.id;

    if (id) {
        const url = REPORTS_WS_URL + '?id=' + id;

        // Call WS asynchronously
        request.delete(url, { json: true }, function(err, wsres) {
            if (err) {
                logger.error('ERROR: ' + err);
                logger.error(JSON.stringify(wsres));
                return;
            }

            logger.info('Ok delete received > ' + JSON.stringify(wsres.body));
            res.redirect('/');
        });
    }
    res.redirect('/');
});

/* GET reports page. */
router.get('/', function(req, res) {
    // Call WS asynchronously
    request.get(REPORTS_WS_URL, { json: true }, function(err, wsres) {
        if (err) {
            logger.error('ERROR: ' + err);
            logger.error(JSON.stringify(wsres));
            return;
        }

        logger.info('Ok get received > ' + JSON.stringify(wsres.body));

        const context = wsres.body;
        context.title = 'Reports';
        context.username = req.session.username;

        res.render(TEMPLATE, context);
    });
});

module.exports = router;
