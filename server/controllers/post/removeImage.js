const logger = require('../../util/logger')
const Post = require('../../db/postModel');

const removeImage = async (req,res,next) => {
  const { imgUrl, imgPath } = req.body;
  const id = req.params._id;
  
  if (!imgUrl || !imgPath || !id) {
    logger.error(`ERROR: Remove Image, could not resolve input in update application post: ${id}`);
    return next({
      log: `ERROR: removeImage`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    })
  }

  /** 
   * NEED LOGIC TO REMOVE IMAGES FROM FIREBASE
   */

  try {      
    const queryResult = await Post.updateOne(
      { _id : id },
      { $pull: { 'images': { imgUrl: imgUrl } } },
      { new: true }
    );

    if (queryResult.modifiedCount === 0) {
      logger.error(`ERROR: Remove image, conflict in database. Unable to modify image array ${id}`);
      return res.status(409).send(queryResult);
    }
    else {
      logger.info(`SUCCESS: Removed image from ${id}`) 
      return res.status(200).send(queryResult);
    }
  } catch (err) {
    logger.error(`ERROR: Remove image, an error occurred while attempting to remove image from post`);
    return next ({
      log: `ERROR: removeImage, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to remove image from post'}
    })
  }
};

module.exports = removeImage;