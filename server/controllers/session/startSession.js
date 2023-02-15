const Session = require('../../db/sessionModel');

const startSession = async (req, res, next) => {
  if (res.locals.user) {
    try {
      const id = res.locals.user._id.toString();
      await Session.create({ cookieId: id });
      return next();
    } catch (err) {
      return next({
        log: `ERROR: startSession, ${err}`,
        status: 500,
        message: { err: 'an error occured while attempting to start a session' },
      });
    }
  } else return next();
};

module.exports = startSession;
