const cookieParser = require('cookie-parser');
const Session = require('../db/session');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    // destructure ssid cookies
    const { ssid } = req.cookies;
    
    // create a new session in the session model
    // the cookie ID value will be the ssid cookie value
    const verified = await Session.findOne({ cookieId: ssid });

    // check to see if session is found
    // redirect to the signup page if session was not found
    // otherwise we can return to the next piece of middle ware
    if (!verified){
        res.redirect('/signup') 
    } else {
        return next();
    }
  } catch (err) {
    return next ({
        log : `Error occur in sessionController.isLoggedIn ${err}`,
        message: {err: `in sessionController.isLoggedIn`}
    })

  }
};

sessionController.startSession = async (req, res, next) => {
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

module.exports = sessionController;