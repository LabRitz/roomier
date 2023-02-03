const Post = require('../../db/postModel');

const getProfilePosts = async (req, res, next) => {
  const username = req.params.username;
  if (!username) return next ({
      log: `ERROR: getProfilePosts`,
      status: 400, 
      message: {err: 'Username not supplied'}
    })
  try {
    const queryResult = await Post.find({'userData.username': username})
    return res.status(200).json(queryResult);
  } catch (err) {
    return next ({
      log: `ERROR: getProfilePosts, ${err}`,
      status: 500, 
      message: {err: 'an error occurred while attempting to get user posts'}
    })
  }
}

module.exports = getProfilePosts;