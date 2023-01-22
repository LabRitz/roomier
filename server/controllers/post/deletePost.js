const Post = require('../../db/postModel');

const deletePost = async (req, res, next) => {
  const id = req.params._id;
  if (!id) return next({
      log: `ERROR: deletePost, ${err}`,
      status: 400,
      message: {err: 'Cannot resolve id from params'}
    })

  try {
    const queryResult = await Post.deleteOne({_id: id })
    return res.status(200).json(queryResult);    
  } catch (err) {
    return next ({
      log: `ERROR: deletePost, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to delete a post in profile'}
    })
  }
};

module.exports = deletePost;