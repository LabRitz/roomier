const Post = require('../../db/postModel');

const filterPostsByDistance = async (req, res, next) => {
  const { lng, lat , minDistance, maxDistance} = req.body
  const username = req.params.username

  try {
    const queryResult = await Post.find({
      geoData: { 
        $near: {
          $geometry: { type: "Point",  coordinates: [ lng, lat ] },
          $minDistance: minDistance,
          $maxDistance: maxDistance
        }
      }
    })

    // const queryResult = await Post.aggregate([
    //   {
    //     $geoNear: {
    //       near: { type: 'Point', coordinates: [lng, lat] } ,
    //       spherical: true,
    //       query:{'userData.username': {$ne: username}},
    //       distanceField: 'calcDistance'
    //     }
    //   }
    // ])
    return res.status(200).json(queryResult);
  } catch (err) {
    return next ({
      log: `ERROR: filterPostsByDistance, ${err}`,
      message: {err: 'an error occurred while attempting to filter for posts'}
    })
  }
};

module.exports = filterPostsByDistance;