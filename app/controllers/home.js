
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
    user: req.user,
    zones: [] // Need to create this model. Create a zone. Will automatically make archive and radio playlists. Zone view should allow creation of playlists on the fly.  Next step is to allow creation of a zone by specifying an existing archive and radio.
  });
};