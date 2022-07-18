const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = Schema({
  picture: {type: String},
  address: {
    street1: {type: String, required: true},
    street2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
  },
  roommate: {
    gender: {type: String, required: true, default: 'No Preference'},
  },
  description: {
    BR: {type: Number},
    BA: {type: Number},
    sqFt: {type: Number},
    pets: {type: Boolean},
    smoking: {type: Boolean},
    parking: {type: Boolean},
    condition: {type: String},
  },
  moveInDate: {type: Date, default: Date.now },
  utilities: {type: Number, required: true},
  rent: {type: Number, required: true},
  bio: {type: String},
  userData: {
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String}
  },
  applicantData: {type: Array}
})

const Post = mongoose.model('post', post);

module.exports = Post;