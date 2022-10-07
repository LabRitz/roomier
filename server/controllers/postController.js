/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = require('../db/postModel');

const postController = {};

postController.createPost = async (req, res, next) => {
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
    res.locals.createPost = newPost
    return next();
  } catch (err) {
    return next({
      log: `error caught in postController.createPost : ${err}`,
      message: {err: 'an error occurred while attempting to create a post'}
    })
  }
};


//Get Post
postController.getAllPosts = async (req, res, next) => {
  try {
    const username = req.params.username

    // updated query results - find everything where username is not username
    const queryResult = await Post.find({'userData.username': {$ne: username}});
    
    res.locals.allPosts = queryResult;
    
    return next();
  } catch (err) {
    return next({
    log: `error caught in postController.getAllPost : ${err}`,
    message: {err: 'an error occurred while attempting to get a post'}
  })}
};

// Populate user's own posts
postController.getProfilePosts = async (req, res, next) => {
  try {
    // user email that we are grabbing
    const username = req.params.username;

    // parse through mongoDB and get all posts with username using find
    const queryResult = await Post.find({'userData.username': username})

    // store for output
    res.locals.profilePosts = queryResult;
  
    return next();
  } catch (err) {
    return next ({
      log: `error caught in postController.getProfilePosts : ${err}`,
      message: {err: 'an error occurred while attempting to get a post in profile'}
    })
  }
}


//Update # of Applications in Post
postController.updateApplicationPost = async (req,res,next) => {
  try {
    const { firstName, lastName, username } = req.body;
    const id = req.params._id;

    const newApplicant = {
      firstName: firstName,
      lastName: lastName,
      username: username
    };

    // Step1: Find the post matching the id
    const foundPost = await Post.findOne({ _id : id })
    // Step2: Linear search the post's applicantData array and find a match with applicantData.username
    for (let i = 0; i < foundPost.applicantData.length; i++) {
      if (foundPost.applicantData[i].username === username) {
        res.locals.updatedPost = false;
        return next();
      }
    }

    // continue if user is not applicant
    const queryResult = await Post.updateOne(
      { _id : id },
      { $push: { applicantData: newApplicant } }
    )
    res.locals.updatedPost = queryResult.acknowledged;
    return next();
  } catch (err) {
    return next ({
      log: `error caught in postController.updateApplicationPost : ${err}`,
      message: {err: 'an error occurred while attempting to update the applications # int he posts'}
    })
  }
}


//Delete Post
postController.deletePost = async (req, res, next) => {
  // console.log('read 1')
  const id = req.params._id;
  // console.log('inside postController.deletePost: ' , req.params._id)
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

// Filter for posts by distance
postController.filterPostsByDistance = async (req, res, next) => {
  const { lng, lat } = req.body
  const username = req.params.username

  try {
    const queryResult = await Post.find({
      geoData: { 
        $near: {
          $geometry: { type: "Point",  coordinates: [ lng, lat ] },
          $minDistance: 1000,
          $maxDistance: 5000
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
    res.locals.allPosts = queryResult;
    return next();
  } catch (err) {
    return next ({
      log: `error caught in postController.filterPostsByDistance: ${err}`,
      message: {err: 'an error occurred while attempting to filter for posts'}
    })
  }
}

module.exports = postController;