
/*!
 * Module dependencies.
 */
const passport = require('passport');


exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();    
  }
  
  res.redirect('/');
}