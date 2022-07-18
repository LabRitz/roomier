const cookieParser = require('cookie-parser');

const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = async (req, res, next) => {
  // store our user._id as SSID, httpOnly
  await res.cookie('ssid ', res.locals.user._id, {
    httpOnly: true,
  })

  return next();
}

cookieController.getCookie = async (req, res, next) => {
  const cookie = req.headers.cookie;
  console.log('cookieController.getCookie: ', req.headers.cookie)
  return next();
}

module.exports = cookieController;
