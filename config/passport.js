'use strict';

/*
 * Module dependencies.
 */

const mongoose = require('mongoose');
const local = require('./passport/local');
const spotify = require('./passport/spotify');

const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = function (passport) {

  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.spotifyId));
  passport.deserializeUser((id, done) => User.findOne({ spotifyId: id }, done));

  // use these strategies
  // passport.use(local);
  passport.use(spotify);
};
