
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  console.log('user', req.user);
  res.render('home/index', {
    title: 'FZ Radio',
    user: req.user
  });
};
