const Session = require("../../db/sessionModel");

const deleteSession = async (req, res, next) => {
  const { cookieId } = res.locals;
  try {
    const response = await Session.deleteOne({ cookieId: cookieId });
    return res.status(204).send(true);
  } catch (err) {
    return next({
      log: `ERROR: deleteSession ${err}`,
      status: 500,
      message: {err: "An error occurred while attempting to delete session in signout"},
    });
  }
};

module.exports = deleteSession;
