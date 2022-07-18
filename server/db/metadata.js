const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadata = Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },

  // from navBar
  id: { type: String, required: true }
  // profilePicture: {type: Buffer},
})

const MetaData = mongoose.model('Metadata', metadata);

module.exports = MetaData;