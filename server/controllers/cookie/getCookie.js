// Verify existing logged in user
const getCookie = async (req, res, next) => {
  const userId = req.cookies.ssid;

  if (!userId) res.status(200).send(false)
  res.locals.userId = userId;
  return next();
}

module.exports = getCookie;