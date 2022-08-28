const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bcrypt library to help encrypt our password
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;

const user = Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  zipCode: {type: String}
})

// Prefunction that uses bcrypt to hash our password and resave
// into our database
user.pre('save', function(next){
  const user = this;  

  // bcrypt hash function here
  bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  })
});

const User = mongoose.model('User', user);

module.exports = User;
