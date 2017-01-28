
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var createdUpdatedPlugin = require('../lib/mongoose-createdat-updatedat');
var Counter = require('./counter');

/**
 * Zone schema
 */

var ZoneSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  owner: {
    type: String,
    required: true,
    ref: 'user'
  },
  registered: {
    type: Boolean,
    default: false    
  }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

ZoneSchema.pre('save', function(next) {
  var zone = this;
  if (!zone.isNew) {
    return next();
  }
  Counter.findByIdAndUpdate({_id: 'zoneid'}, {$inc: {seq: 1}}, function(err, counter) {
    if (err) {
      return next(err);
    }
    zone._id = counter.seq;
    return next();
  });
});

/**
 * Methods
 */


// ZoneSchema.method({

// });

/**
 * Statics
 */

// ZoneSchema.static({

// });

/**
 * Register
 */
ZoneSchema.plugin(createdUpdatedPlugin);

mongoose.model('Zone', ZoneSchema);
