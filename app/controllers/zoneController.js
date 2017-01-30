
/*!
 * Module dependencies.
 */

exports.renderCreate = function (req, res) {
  res.render('zone/create', {
    user: req.user
  });
};

exports.create = function (req, res) {
  console.log(req.body);
  res.redirect('/');
};