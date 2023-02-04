const Post = require('../../db/postModel');

const filterPostsByDistance = async (req, res, next) => {
  const { lng, lat , minDistance, maxDistance} = req.body
  const username = req.params.username
  if (username === undefined || lng === undefined || lat === undefined || 
    minDistance === undefined || maxDistance === undefined) {
    res.sendStatus(400)
  }

  try {
    const queryResult = await Post.find({
      geoData: { 
        $near: {
          $geometry: { type: "Point",  coordinates: [ lng, lat ] },
          $minDistance: minDistance,
          $maxDistance: maxDistance
        }
      },
      'userData.username': {$ne: username}
    })
    return res.status(200).json(queryResult);
  } catch (err) {
    return next ({
      log: `ERROR: filterPostsByDistance, ${err}`,
      status: 500,
      message: {err: 'an error occurred while attempting to filter for posts'}
    })
  }
};

module.exports = filterPostsByDistance;