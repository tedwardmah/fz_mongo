
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.render('home', {
      user: req.user
    });
  }
};

exports.dashboard = function (req, res) {
  
  res.render('dashboard', {
    user: req.user
  });
};