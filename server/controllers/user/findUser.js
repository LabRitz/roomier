const User = require('../../db/userModel');

const findUser = async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const data = await User.findOne({_id: userId});
    if (!data) {
      return next({
        log: `ERROR: findUser ${err}`,
        message: {err: 'Cannot find user based on userId'}
      })
    }
    else res.status(200).json(data);
  } 
  catch (err) {
    return next({
      log: `error caught in userController.findUser : ${err}`,
      message: {err: 'an error occurred while attempting to find a user'}
    })
  }
}

module.exports = findUser;