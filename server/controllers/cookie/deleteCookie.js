// Signout
const deleteCookie = (req, res, next) => {
  if (req.cookies.ssid) {
    res.locals.cookieId = req.cookies.ssid;
    res.clearCookie("ssid");
    next();
  } else {
    return next({
      log: `ERROR: deleteCookie ${err}`,
      message: {
        err: "an error occurred while attempting to delete cookie in signout",
      },
    });
  }
};
module.exports = deleteCookie;