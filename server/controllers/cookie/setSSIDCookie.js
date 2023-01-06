// setSSIDCookie - store the user id in a cookie
const setSSIDCookie = async (req, res, next) => {
  // store our user._id as SSID, httpOnly

  if (res.locals.user !== null) {
    await res.cookie('ssid ', res.locals.user._id, {
      httpOnly: true,
      // maxAge: 30000
    })
  }

  return next();
  
}

module.exports = setSSIDCookie;
