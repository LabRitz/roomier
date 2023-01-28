const Post = require('../../db/postModel');

const removeImage = async (req,res,next) => {
  const { imgUrl, imgPath } = req.body;
  const id = req.params._id;
  
  if (!imgUrl || !imgPath || !id) {
    return next({
      log: `ERROR: removeImage`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    })
  }

  try {      
    // const queryResult = await Post.findOneAndUpdate(
    const queryResult = await Post.updateOne(
      { _id : id },
      // { 'images': { $elemMatch: { $eq: imgUrl } } },
      { $pull: { 'images': { $in: [imgUrl] } } },
    //   { _id : id },
    //   { $pull: {
    //     images: { [imgUrl]: imgPath }
    //   }} 
      { 
        new: true, 
        multi: true, 
        upsert: true 
      }
    );

    // const found = await Post.findOne({ 
    //   "images": { 
    //     "$elemMatch": { 
    //       'https://firebasestorage.googleapis.com/v0/b/roomier-1cc68.appspot.com/o/images%2Fblee3395%40gmail.com%2F091f3998ad48f79ab23bfd479fdecaa3-uncropped_scaled_within_1536_1152.webp?alt=media&token=ded4c2bd-5631-4a02-8941-77ec9b1c90ed': 'images/blee3395@gmail.com/091f3998ad48f79ab23bfd479fdecaa3-uncropped_scaled_within_1536_1152.webp' 
    //     } 
    //   }
    // })
    
    // console.log(found)

    // console.log(queryResult)
    return res.status(200).send(queryResult);
    // return res.status(200).send(queryResult.acknowledged);
  } catch (err) {
    return next ({
      log: `ERROR: removeImage, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to update the posts'}
    })
  }
};

module.exports = removeImage;