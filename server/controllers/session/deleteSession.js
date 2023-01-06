const Session = require("../../db/sessionModel");

const deleteSession = async (req, res, next) => {
  const { cookieId } = res.locals;
  try {
    //delete session associated with user's ID from session DB
    const response = await Session.deleteOne({ cookieId: cookieId });
    return res.status(200).send(true);
  } catch (err) {
    return next({
      log: `ERROR: deleteSession ${err}`,
      message: {
        err: "An error occurred while attempting to delete session in signout",
      },
    });
  }
};

module.exports = deleteSession;
