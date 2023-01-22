const Post = require('../../db/postModel');

const getAllPosts = async (req, res, next) => {
  try {
    const username = req.params.username
    // updated query results - find everything where username is not username
    const queryResult = await Post.find({'userData.username': {$ne: username}});
    
    return (queryResult) ? res.status(200).json(queryResult) : 
      next({
        log: `ERROR: getAllPost`,
        status: 404,
        message: {err: 'Cannot find posts for user'}
      })
  } catch (err) {
    return next({
    log: `ERROR: getAllPost,  ${err}`,
    status: 500,
    message: {err: 'an error occurred while attempting to get a post'}
  })}
};

module.exports = getAllPosts;