const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = require('../db/postModel');

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
      userData
    } = req.body;
    
    //deconstruct sub object inside createPost
    const addressObj = {
      street1: address.street1, 
      street2: address.street2, 
      city: address.city, 
      state: address.state, 
      zipCode: address.zipCode
    };
    const roommateObj = {
      gender: roommate.gender
    }
    const descriptionObj = {
      BR: description.BR, 
      BA: description.BA, 
      sqFt: description.sqFt, 
      pets: description.pets, 
      smoking: description.smoking, 
      parking: description.parking, 
      condition: description.condition
    };
    
    // const newPost = await new Post ({
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
      }
    });
    res.locals.createPost =  newPost
    return next();
  } catch (err) {
    return next({
      log: `error caught in postController.createPost : ${err}`,
      message: {err: 'an error occurred while attempting to create a post'}
    })
  }
};

postController.getAllPosts = async (req, res, next) => {
  console.log('get All Posts')
  try {
    // object to house our find request
    const queryResult = await Post.find({});
    // console.log(queryResult);
    
    res.locals.allPosts = queryResult;

    return next();
  } catch (err) {
    return next({
    log: `error caught in postController.getAllPost : ${err}`,
    message: {err: 'an error occurred while attempting to get a post'}
  })}
};

postController.getProfilePosts = async (req, res, next) => {
  console.log('get Profile Posts')
  try {
    // user email that we are grabbing
    const { username } = req.body;

    // parse through mongoDB and get all posts with username using find
    const queryResult = await Post.find({userData: {username: username}})

    // store for output
    res.locals.getProfilePosts = queryResult
  
    return next();
  } catch (err) {
    return next ({
      log: `error caught in postController.getProfilePosts : ${err}`,
      message: {err: 'an error occurred while attempting to get a post in profile'}
    })
  }
}

postController.deletePost = async (req, res, next) => {
  console.log('read 1')
  const id = req.params._id;
  console.log('inside postController.deletePost: ' , req.params._id)
  try {
    const queryResult = await Post.deleteOne({_id: id })
    res.locals.deleteProfile = queryResult;    
    console.log('res.locals.deleteProfile:' , res.locals.deleteProfile)
    return next();
  } catch (err) {
    return next ({
      log: `error caught in postController.deletePost : ${err}`,
      message: {err: 'an error occurred while attempting to delete a post in profile'}
    })
  }
  
}

module.exports = postController;