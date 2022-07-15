const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = Schema({
  // picture
  address: [{
    street1: {type: String},
    street2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
  }],
  roommate: [{
    gender: {type: String, default: 'No Preference'},
  }],
  description: [{
    BR: {type: Number, required: true},
    BA: {type: Number, required: true},
    sqFt: {type: Number},
    pets: {type: Boolean, default: false},
    smoking: {type: Boolean, default: false},
    parking: {type: Boolean, default: false},
    condition: {type: String},
  }],
  moveInDate: {type: Date, default: Date.now },
  utilities: {type: Number, required: true},
  rent: {type: Number, required: true},
  bio: {type: String}
})

module.exports = mongoose.model('Post', post);