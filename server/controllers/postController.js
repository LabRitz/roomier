const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createPost = require('../db/createPost');

const postController = {};

postController.createPost= async (res, res, next) => {
  try {
    // deconstruct from our post request
    const {} = req.body;

    //
    
  } catch (err) {
    return next({
      log: `error caught in postController.createPost : ${err}`,
      message: {err: 'an error occurred while attempting to create a post'}
    })
  }
};