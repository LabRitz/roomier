const bcrypt = require('bcryptjs');

const User = require('../../db/userModel');

const verifyUser = async (req, res, next) => {
  try {
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
      res.locals.user = null;
      return next({
        log: `error caught in userController.verifyUser`,
        message: {error: 'an error occurred while attempting to verify a user'}
      })
    } else {
      // store for access
      res.locals.user = queryResult;
      return next();
    } 
  } 
  catch (err) {
    return next({
      log: `error caught in userController.verifyUser : ${err}`,
      message: {err: 'an error occurred while attempting to verify a user'}
    })
  }
};

module.exports = verifyUser;