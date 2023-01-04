const Session = require('../../db/sessionModel');

const startSession = async (req, res, next) => {
  try {
    // destructure id off or res.locals
    const id = res.locals.user._id.toString();

    await Session.create({ cookieId: id });
    return next(); 
  } catch (err) {
    return next({
      log : `Error occur in sessionController.startSession ${err}`,
      message: { err: 'an error occured while attempting to start a session'}
    })
  }
};

module.exports = startSession;