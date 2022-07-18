const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = require('../db/createPost');

const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    // deconstruct from our post request
    const { 
      // picture, 
      address, 
      roommate, 
      description,
      moveInDate, 
      utilities, 
      rent, 
      bio,
      userData,
    } = req.body;
    
    //deconstruct sub object inside createPost
    // const addressObj = {
    //   street1: address.street1, 
    //   street2: address.street2, 
    //   city: address.city, 
    //   state: address.state, 
    //   zipCode: address.zipCode
    // };
    // const roommateObj = {
    //   gender: roommate.gender
    // }
    // const descriptionObj = {
    //   BR: description.BR, 
    //   BA: description.BA, 
    //   sqFt: description.sqFt, 
    //   pets: description.pets, 
    //   smoking: description.smoking, 
    //   parking: description.parking, 
    //   condition: description.condition
    // };
    
    // const newPost = await new Post ({
    const newPost = await Post.create({
      // picture,
      // address: addressObj,
      // roommate: roommateObj,
      // description: descriptionObj,
      // moveInDate: moveInDate,
      // utilities: utilities,
      // rent: rent,
      // bio: bio

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
      bio: bio
    });
    res.locals.createPost = newPost
    return next();
  } catch (err) {
    return next({
      log: `error caught in postController.createPost : ${err}`,
      message: {err: 'an error occurred while attempting to create a post'}
    })
  }
};




/*
  picture: {type: Buffer},
  address: {
    street1: {type: String}, required: true,
    street2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
  },
  roommate: {
    gender: {type: String, required: true, default: 'No Preference'},
  },
  description: [{
    BR: {type: Number, required: true},
    BA: {type: Number, required: true},
    sqFt: {type: Number},
    pets: {type: Boolean, default: false},
    smoking: {type: Boolean, default: false},
    parking: {type: Boolean, default: false},
    condition: {type: String},
  }],
  moveInDate: {type: Date, default: Date.now },
  utilities: {type: Number, required: true},
  rent: {type: Number, required: true},
  bio: {type: String}
*/

module.exports = postController;