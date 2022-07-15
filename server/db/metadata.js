const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadata = Schema({
  ownerId: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
})

module.exports = mongoose.model('Metadata', metadata);