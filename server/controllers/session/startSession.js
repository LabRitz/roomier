const Session = require('../../db/sessionModel');

const startSession = async (req, res, next) => {

  if (res.locals.user !== null) {
    try {
      // destructure id off or res.locals
      const id = res.locals.user._id.toString();
  
      await Session.create({ cookieId: id });
      return next(); 
    } catch (err) {
      console.log('err in startSession.js', err);
      return next({
        log : `Error occur in sessionController.startSession ${err}`,
        message: { err: 'an error occured while attempting to start a session'}
      })
    }
  }

  else return next();
};

module.exports = startSession;