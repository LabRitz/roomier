const Session = require('../../db/sessionModel');

const isLoggedIn = async (req, res, next) => {
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

module.exports = isLoggedIn;