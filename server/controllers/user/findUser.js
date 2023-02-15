const User = require('../../db/userModel');

const findUser = async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const data = await User.findOne({ _id: userId });
    if (!data) {
      return next({
        log: 'ERROR: findUser',
        status: 404,
        message: { err: 'Cannot find user based on userId' },
      });
    }
    return res.status(200).json(data);
  } catch (err) {
    return next({
      log: `ERROR: findUser, ${err}`,
      status: 500,
      message: { err: 'an error occurred while attempting to find a user' },
    });
  }
};

module.exports = findUser;
