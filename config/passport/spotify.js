
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = mongoose.model('User');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

/**
 * Expose
 */

module.exports = new SpotifyStrategy({
    clientID: requiredProcessEnv('FRIEND_ZONE_CLIENT_ID'),
    clientSecret: requiredProcessEnv('FRIEND_ZONE_CLIENT_SECRET'),
    callbackURL: 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    User.findOrCreate({ 
      name: profile.displayName,
      spotifyId: profile.id 
    })
    .then(function (user) {
      console.log(user);
      return done(null, user);
    })
    .catch(done);
  }
);
