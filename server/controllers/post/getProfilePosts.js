const Post = require('../../db/postModel');

const getProfilePosts = async (req, res, next) => {
  try {
    // user email that we are grabbing
    const username = req.params.username;

    // parse through mongoDB and get all posts with username using find
    const queryResult = await Post.find({'userData.username': username})

    // store for output
    return res.status(200).json(queryResult);
  } catch (err) {
    return next ({
      log: `ERROR: getProfilePosts, ${err}`,
      message: {err: 'an error occurred while attempting to get a post in profile'}
    })
  }
}

module.exports = getProfilePosts;