/*

    SmartExpress N2
    Authorization layer

 */

const logger = require('winston');

const checkAuth = function(req, res, next) {
    if (!req.session.login || !req.session.login.username) {
        if (req.originalUrl) {
            logger.info(
                'User is not authorized to view the page ' + req.originalUrl
            );
            res.redirect(
                '/login?target=' + encodeURIComponent(req.originalUrl)
            );
        } else {
            res.redirect('/login');
        }
    } else {
        next();
    }
};

module.exports = {
    checkAuth,
};
