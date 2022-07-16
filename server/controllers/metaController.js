const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadata = require('../db/metadata');

const metaController = {};

// metadata is for post creation data

/* 
  ownerId: {type: String, required: true}, - email
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  profilePicture: {type: Buffer},
*/

metaController.createPost = async (req,res,next) => {
    try {
      

    } catch (err) {
      return next({
        log: `error caught in metaController.createPost : ${err}`,
        message: {err: 'an error occurred while attempting to create a post in Meta data controller...'}
    })
  }
}