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
    res.locals.createPost = newPost
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
module.exports = postController;