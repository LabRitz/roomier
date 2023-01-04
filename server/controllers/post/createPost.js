const Post = require('../../db/postModel');

const createPost = async (req, res, next) => {
  try {
    // deconstruct from our post request
    const {  
      address, 
      roommate, 
      description,
      moveInDate, 
      utilities, 
      rent, 
      bio,
      userData,
      geoData,
      images
    } = req.body;
    const newPost = await Post.create({
      address: {
        street1: address.street1,
        street2: address.street2,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      },
      roommate: {
        gender: roommate.gender,
      },
      description: {
        BR: description.BR, 
        BA: description.BA, 
        sqFt: description.sqFt, 
        pets: description.pets, 
        smoking: description.smoking, 
        parking: description.parking, 
        condition: description.condition
      },
      moveInDate: moveInDate,
      utilities: utilities,
      rent: rent,
      bio: bio,
      userData: {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName
      },
      applicantData: [],
      geoData: {
        type: 'Point',
        coordinates: [geoData.lng, geoData.lat],
        lat: geoData.lat,
        lng: geoData.lng
      },
      images: images
    });
    return res.status(200).json(newPost)
  } catch (err) {
    return next({
      log: `ERROR: createPost, ${err}`,
      message: {err: 'an error occurred while attempting to create a post'}
    })
  }
};

module.exports = createPost;