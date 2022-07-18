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
      },
      applicantData: []
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
    // grab username somehow
    const username = req.params.username

    // updated query results - find everything where username is not username
    const queryResult = await Post.find({'userData.username': {$ne: username}});

    // object to house our find request
    // const queryResult = await Post.find({});
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

    console.log(id)

    const newApplicant = {
      firstName: firstName,
      lastName: lastName,
      username: username
    };

    console.log('step 1:', newApplicant)

    // linear search to see if user is alrdy an applicant
    const results = await Post.findOne({applicantData: {username: username}})

    console.log('finding here 2')
    
    if (results) {
      console.log('from updateApplicantPost result :', results)
      res.locals.updatedPost = false;
      return next();
    }

    // continue if user is not applicant
    const queryResult = await Post.updateOne(
      { _id : id },
      { $push: { applicantData: newApplicant } }
    )

    console.log('succesfully updated: ', id)

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

// // completed Post
// postController.completePost = async (req, res, next) => {
//   try {
    
//   } catch (err){
//     return next ({
//       log: `error caught in postController.completePost : ${err}`,
//       message: {err: 'an error occurred while attempting to complete a post in profile'}
//     })
//   }
// }

module.exports = postController;