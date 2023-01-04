// Signout
const deleteCookie = async (req,res,next) => {
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

module.exports = deleteCookie;