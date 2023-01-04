const User = require('../../db/userModel');

const findUser = async (req, res, next) => {
  try {
    const data = await User.find({});
    return next();
  } 
  catch (err) {
    return next({
      log: `error caught in userController.findUser : ${err}`,
      message: {err: 'an error occurred while attempting to find a user'}
    })
  }
}

module.exports = findUser;