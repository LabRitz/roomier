/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

// controllers
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')


//localhost:3000/signup
router.post('/signup',
  userController.createUser, 
  (req, res) => {
    return res.status(200).json(res.locals.user)
})

// locahost:3000
// Login route handler
router.post('/', 
  userController.verifyUser, 
  cookieController.setSSIDCookie, 
  sessionController.startSession, 
  (req, res) => {
    return res.status(200).json(res.locals.user);
})

// Request to get posts for homePage
router.get('/home/:username', 
  postController.getAllPosts, 
  (req,res ) => {
    return res.status(200).json(res.locals.allPosts);
});

// Update applications in posts 
router.patch('/home/:_id', 
  postController.updateApplicationPost, 
  (req, res) => {
    return res.status(200).send(res.locals.updatedPost);
})

router.get('/findUser', 
  userController.findUser, 
  (req, res) => {
    // postController.createPost
    return res.status(200).json({});
});

//localhost:3000/home
router.post('/createPost', 
  postController.createPost, 
  (req,res) => {
    return res.status(200).json(res.locals.createPost)
});

router.get('/getcookie', 
  cookieController.getCookie, 
  (req, res) => {
    return res.status(200).json({})
});

router.get('/profile/:username',
  postController.getProfilePosts, 
  (req,res) => {
    return res.status(200).json(res.locals.profilePosts)
});

router.delete('/profile/:_id', 
  postController.deletePost, 
  (req, res) => {
    return res.status(202).json(res.locals.deleteProfile);
});

//cookies route
router.get('/signout', 
  cookieController.deleteCookie , 
  (req,res) => {
    return res.status(200).json({})
});

module.exports = router;