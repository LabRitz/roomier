const logger = require('../../util/logger');
const Post = require('../../db/postModel');

const getAllPosts = async (req, res, next) => {
  const { username } = req.params;
  try {
    // updated query results - find everything where username is not username
    const queryResult = await Post.find({ 'userData.username': { $ne: username } });

    if (queryResult) {
      logger.info(`SUCCESS: Retrieved all posts, user: ${username}`);
      return res.status(200).json(queryResult);
    }

    logger.error(`ERROR: Could not get all posts, user: ${username}`);
    return next({
      log: 'ERROR: getAllPosts',
      status: 404,
      message: { err: 'Cannot find posts for user' },
    });
  } catch (err) {
    logger.error(`ERROR: getAllPosts, user: ${username}, ${err}`);
    return next({
      log: `ERROR: getAllPosts, ${err}`,
      status: 500,
      message: { err: 'an error occurred while attempting to get a post' },
    });
  }
};

module.exports = getAllPosts;
