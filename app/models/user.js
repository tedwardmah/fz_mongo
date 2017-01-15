
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
  spotifyId: { type: String, required: true },
  accessToken: {type: String, required: true },
  refreshToken: {type: String, required: true }
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

UserSchema.statics.findOrCreate = function(spotifyData) {
  var self = this;
  var accessToken = spotifyData.accessToken;
  var refreshToken = spotifyData.refreshToken;
  var spotifyProfile = spotifyData.profile;
  return new Promise(function(resolve, reject){
    self
      .findOne({spotifyId: spotifyData.spotifyId}).exec()
      .then(function(user){
        if (user) {
          console.log('user found');
          return resolve(user); 
        } else {
          self
            .create({
              accessToken: accessToken,
              refreshToken: refreshToken,
              name: spotifyProfile.displayName,
              spotifyId: spotifyProfile.id 
            })
            .then(function(user){
              console.log('created!');
              return resolve(user);
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
