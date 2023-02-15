const deleteCookie = (req, res, next) => {
  if (req.cookies.ssid) {
    res.locals.cookieId = req.cookies.ssid;
    res.clearCookie('ssid');
    return next();
  }
  return next({
    log: 'ERROR: deleteCookie',
    status: 500,
    message: { err: 'an error occurred while attempting to delete cookie' },
  });
};
module.exports = deleteCookie;
