const User = require('../../db/userModel');

const createUser = async (req, res, next) => {
  try {
    const {
      firstName, lastName, username, password, zipCode,
    } = req.body;

    // checking if username or password is empty
    if (!username || !password) {
      return next({
        log: 'ERROR: createUser',
        status: 422,
        message: { err: 'Username or password missing in userContoller.createUser' },
      });
    }

    const results = await User.findOne({ username });

    if (results) return res.status(409).json(null);

    // if username/password is not empty, we will create our user
    const queryResult = await User.create({
      firstName, lastName, username, password, zipCode,
    });

    return res.status(201).json(queryResult);
  } catch (err) {
    return next({
      log: `ERROR: createUser, ${err}`,
      status: 500,
      message: { err: 'an error occurred when attempting to create a user' },
    });
  }
};

module.exports = createUser;
