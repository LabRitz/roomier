const setSSIDCookie = (req, res, next) => {
  if (res.locals.user !== null) {
    res.cookie('ssid ', res.locals.user._id, {
      httpOnly: true,
      secure: true,
      // maxAge: 30000
    });
  }

  return next();
};

module.exports = setSSIDCookie;
