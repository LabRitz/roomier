const express = require('express');
const router = express.Router();

// controllers
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const metaController = require('../controllers/metaController')


//localhost:3000/signup
router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    return res.status(200).json(res.locals.user)
})

// locahost:3000
//login
router.post('/', 
  userController.verifyUser, 
  cookieController.setSSIDCookie, 
  sessionController.startSession, 
  (req, res) => {
    console.log('res.cookie: ', res.cookies);
    return res.status(200).json(res.locals.user);
})


router.get('/findUser', userController.findUser, (req, res) => {
  // postController.createPost
  return res.status(200).json({});
})

//localhost:3000/home
router.post('/createPost', postController.createPost, (req,res) => {
  console.log('create post backend: ', res.locals.createPost);
    return res.status(200).json(res.locals.createPost)
})

router.get('/getcookie', cookieController.getCookie, (req, res) => {
  return res.status(200).json({})
})


//cookies route

module.exports = router;

//localhost8080 => display the login => verify => CHECK
//localhost8000/signup => createUsers signup => CHECK 