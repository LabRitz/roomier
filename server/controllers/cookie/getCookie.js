// Verify existing logged in user
const getCookie = async (req, res, next) => {
  const cookie = req.headers.cookie;
  return res.status(200).json({});
}

module.exports = getCookie;