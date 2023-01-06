const Post = require('../../db/postModel');

const deletePost = async (req, res, next) => {
  try {
    const id = req.params._id;
    const queryResult = await Post.deleteOne({_id: id })
    return res.status(200).json(queryResult);    
  } catch (err) {
    return next ({
      log: `ERROR: deletePost, ${err}`,
      message: {err: 'an error occurred while attempting to delete a post in profile'}
    })
  }
};

module.exports = deletePost;