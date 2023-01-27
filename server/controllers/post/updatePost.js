const Post = require('../../db/postModel');

const updatePost = async (req,res,next) => {
  const { address, rent, roommate, description, moveInDate, bio, geoData } = req.body;
  const id = req.params._id;
  
  if (!address || !rent || !roommate || !description || !moveInDate || !bio || !geoData || !id) {
    return next({
      log: `ERROR: updatePost`,
      status: 400,
      message: {err: 'Could not resolve input in update application post'}
    })
  }
  
  try {
    const queryResult = await Post.updateOne(
      { _id : id },
      { $set: { 
        address: address,
        rent: rent,
        roommate: roommate,
        description: description,
        moveInDate: moveInDate,
        bio: bio,
        geoData: {
          type: 'Point',
          coordinates: [geoData.lng, geoData.lat],
          lat: geoData.lat,
          lng: geoData.lng
        },
      }}
    )

    return res.status(200).send(queryResult.acknowledged);
  } catch (err) {
    return next ({
      log: `ERROR: updatePost, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to update the posts'}
    })
  }
};

module.exports = updatePost;