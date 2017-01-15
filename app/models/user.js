
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
// var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var UserSchema = new Schema({
  name: { type: String, required: true },
  spotifyId: { type: String, required: true, unique: true },
  accessToken: {type: String, required: true },
  refreshToken: {type: String, required: true },
  primaryEmail: {type: String, required: true }
});

/**
 * User plugin
 */

// UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */


// UserSchema.method({

// });

/**
 * Statics
 */

// UserSchema.static({

// });

UserSchema.statics.updateOrCreateOnSpotifyAuthorization = function(spotifyData) {
  var self = this;
  var accessToken = spotifyData.accessToken;
  var refreshToken = spotifyData.refreshToken;
  var spotifyProfile = spotifyData.profile;
  return new Promise(function(resolve, reject){
    return self
      .findOne({spotifyId: spotifyProfile.id}).exec()
      .then(function(user){
        if (user) {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          return user
            .save()
            .then(function(user){
              resolve(user);
            })
            .catch(reject);
        } else {
          return self
            .create({
              accessToken: accessToken,
              refreshToken: refreshToken,
              name: spotifyProfile.displayName,
              spotifyId: spotifyProfile.id,
              primaryEmail: spotifyProfile._json.email
            })
            .then(function(user){
              resolve(user);
            })
            .catch(reject);
        }
      })
      .catch(reject);
  });
};

/**
 * Register
 */

mongoose.model('User', UserSchema);
