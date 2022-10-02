/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cookieParser = require('cookie-parser');

const cookieController = {};


// setSSIDCookie - store the user id in a cookie
cookieController.setSSIDCookie = async (req, res, next) => {
  // store our user._id as SSID, httpOnly
  await res.cookie('ssid ', res.locals.user._id, {
    httpOnly: true,
    maxAge: 30000
  })
  return next();
}

// Verify existing logged in user
cookieController.getCookie = async (req, res, next) => {
  const cookie = req.headers.cookie;
  return next();
}

// Signout
cookieController.deleteCookie = async (req,res,next) => {
  res.cookie('ssid', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    })
  req.headers.cookie.remove({
    name: 'ssid',
  }) 
  .status(200)
  .json({success: true, message: "User successfully signout"})
  return next()
}

module.exports = cookieController;
