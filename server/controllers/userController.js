const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../db/user');

const userController = {};

// sign up
userController.createUser = async (req, res, next) => {
  try {
    const {username, password} = req.body;

    // checking if username or password is empty
    if (!username || !password) return next('username or password is missing')

    // if username/password is not empty, we will create our user
    const queryResult = await User.create({ username, password });

    // passing into our res so we can access
    res.locals.user = queryResult;

    return next();
  } catch (err) {
    return next({
      log: `error caught in userController.createUser: ${err}`,
      message: {err: 'an error occurred when attempting to create a user'}
    })
  }
};

// login
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // checking if username or password is empty
    if (!username || !password) return next('username or password is missing')

    // parsing our User db to see if we have a matching username
    const queryResult = await User.findOne({ username });

    // checking to see if the password matches after to our bcrypt hash
    const comparePass = await bcrypt.compare(pass, queryResult.password);

    // redirect to signup endpoint if does not match
    // Look to alert user if they want to signup or not - change redirect
    if (!queryResult || !comparePass) {
      console.log('invalid username or password');
      res.redirect('/signup')
    } else {
      // store for access
      res.locals.user = queryResult;
      return next();
    } 

  } catch (err) {
    return next({
      log: `error caught in userController.verifyUser : ${err}`,
      message: {err: 'an error occurred while attempting to verify a user'}
    })
  }
};

module.exports = userController;