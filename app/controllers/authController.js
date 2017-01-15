
/*!
 * Module dependencies.
 */
const passport = require('passport');

// exports.loginWithSpotify = function(){

// }

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
