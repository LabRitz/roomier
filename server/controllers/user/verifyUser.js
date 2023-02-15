const bcrypt = require('bcryptjs');

const User = require('../../db/userModel');

const verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'ERROR: verifyUser',
      status: 400,
      message: { err: 'Could not resolve username or password' },
    });
  }

  try {
    const queryResult = await User.findOne({ username });

    if (!queryResult) {
      res.locals.user = null;
      return next();
    }

    const comparePass = await bcrypt.compare(password, queryResult.password);
    res.locals.user = (comparePass) ? queryResult : null;
    return next();
  } catch (err) {
    console.log('ERROR: verifyUser', err);
    return next({
      log: `ERROR: verifyUser, ${err}`,
      status: 500,
      message: { err: 'an error occurred while attempting to verify a user' },
    });
  }
};

module.exports = verifyUser;
