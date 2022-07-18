const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const User = require('../db/userModel');

const userController = {};

// sign up
userController.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    // checking if username or password is empty
    if (!username || !password) return next('username or password is missing')

    const results = await User.findOne({username: username})

    if (results) {
      console.log('from userfindone result line 20 :', results)
      res.locals.user = null;
      return next();
    }

    // if username/password is not empty, we will create our user
    const queryResult = await User.create({ firstName, lastName, username, password });

    // passing into our res so we can access
    res.locals.user = queryResult;
    // console.log('res.locals.user, ' , res.locals.user)

    // redirect to login
    res.redirect('/')

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
    console.log('verifyUser reqBody: ', req.body)

    const { username, password } = req.body;

    // checking if username or password is empty
    if (!username || !password) return next('username or password is missing')

    // parsing our User db to see if we have a matching username
    const queryResult = await User.findOne({ username: username });

    // checking to see if the password matches after to our bcrypt hash
    const comparePass = await bcrypt.compare(password, queryResult.password);

    // redirect to signup endpoint if does not match
    // Look to alert user if they want to signup or not - change redirect
    if (!queryResult || !comparePass) {
      console.log('invalid username or password');
      // res.redirect('/signup')
      res.locals.user = null
      // res.send(res.locals.user)
      return next({
        log: `error caught in userController.verifyUser`,
        message: {error: 'an error occurred while attempting to verify a user'}
      })
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

userController.findUser = async (req, res, next) => {
  try {
    const data = await User.find({});
    console.log('data', data)
    // const formattedData = data.json();
    // console.log('format', formattedData);
    return next();
  } catch (err) {
    return next({
      log: `error caught in userController.findUser : ${err}`,
      message: {err: 'an error occurred while attempting to find a user'}
    })
  }
}

module.exports = userController;