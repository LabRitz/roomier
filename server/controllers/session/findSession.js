const Session = require('../../db/sessionModel');

const findSession = async (req, res, next) => {
  try {
    const { userId } = res.locals;
    
    // create a new session in the session model
    // the cookie ID value will be the ssid cookie value
    const currentSession = await Session.findOne({ cookieId: userId });

    // check to see if session is found
    // redirect to the signup page if session was not found
    // otherwise we can return to the next piece of middle ware
    if (!currentSession) return res.status(200).send(false)
    else return next()
  } catch (err) {
    return next ({
      log : `ERROR: findSession, ${err}`,
      status: 500, 
      message: {err: `An error occurred while attempting to find a user session`}
    })
  }
};

module.exports = findSession;