
/*!
 * Module dependencies.
 */
const passport = require('passport');


exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
