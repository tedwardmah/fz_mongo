
/*!
 * Module dependencies.
 */

exports.renderCreate = function (req, res) {
  res.render('zone/create', {
    user: req.user
  });
};