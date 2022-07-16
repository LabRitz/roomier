const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // store our user._id as SSID, httpOnly
  console.log(res.locals.user)
  // res.cookie() 
  return next();

}

module.exports = cookieController;
