const express = require('express');
const router = express.Router();

// controllers
const userController = require('../controllers/userController');


// sign up
router.post('/signup', userController.createUser, (req, res) => {
    return res.status(200).json(res.locals.user)
})

// login
router.post('/', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user);
})



//localhost8080 => display the login => verify => CHECK
//localhost8000/signup => createUsers signup => CHECK 