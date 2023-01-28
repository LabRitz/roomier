const logger = require('../../util/logger')
const Post = require('../../db/postModel');

const deletePost = async (req, res, next) => {
  const id = req.params._id;
  if (!id) {
    logger.error(`ERROR: Delete Post, could not resolve post id`);
    return next({
      log: `ERROR: deletePost, ${err}`,
      status: 400,
      message: {err: 'Cannot resolve id from params'}
    })
  }

  try {
    const queryResult = await Post.deleteOne({_id: id })
    if (!queryResult.acknowledged) {
      logger.error(`ERROR: Delete Post, conflict in database. Unable to delete post ${id}`);
      return res.status(409).json(queryResult);   
    }
    else {
      logger.info(`SUCCESS: Deleted post ${id}`) 
      return res.status(200).json(queryResult);    
    }
  } catch (err) {
    logger.error(`ERROR: Delete Post, an error occurred while attempting to delete a post in profile`);
    return next ({
      log: `ERROR: deletePost, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to delete a post in profile'}
    })
  }
};

module.exports = deletePost;