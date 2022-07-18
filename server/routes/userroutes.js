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
//login
router.post('/', 
  userController.verifyUser, 
  cookieController.setSSIDCookie, 
  sessionController.startSession, 
  (req, res) => {
    // console.log('res.cookie: ', res.cookies);
    return res.status(200).json(res.locals.user);
})

// home
router.get('/home', postController.getAllPosts, (req,res ) => {
  // console.log('getAllPosts route running.')
  return res.status(200).json(res.locals.allPosts);
});

router.get('/findUser', userController.findUser, (req, res) => {
  // postController.createPost
  return res.status(200).json({});
});

//localhost:3000/home
router.post('/createPost', postController.createPost, (req,res) => {
    return res.status(200).json(res.locals.createPost)
});

router.get('/getcookie', cookieController.getCookie, (req, res) => {
  return res.status(200).json({})
});

router.get('/profile',postController.getProfilePosts, (req,res) => {
  return res.status(200).json(res.locals.profilePosts)
});

router.delete('/profile/:_id', postController.deletePost, (req, res) => {
  return res.status(202).json(res.locals.deleteProfile);
});


//cookies route

module.exports = router;

//localhost8080 => display the login => verify => CHECK
//localhost8000/signup => createUsers signup => CHECK 