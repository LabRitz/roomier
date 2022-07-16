const { application } = require('express');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
const userController = require('./controllers/userController');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

//connect to the URI in .env
const URI = process.env.ATLAS_URI;

//oAuth connection
app.use(expressSession({
    secret: "google auth",
    resave: false,
    saveUninitialized: false,
    })
  )

require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/auth/google', passport.authenticate('google', { scope: ['profile'] }))

app.get('/login/auth/google/callback', passport.authenticate('google', { failureDirect: '/'}), (req, res) => {
    res.redirect('/');
})

/* --------------------------------------------
//account to login mongodb:
//username: huujohnle@gmail.com
//password: findaroommate123
------------------------------------------- */

//connect to mongoDB
mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'findARoommate'
    })      
    .then(() => {
        console.log("Successfully connected to MongoDB!");
        })
    .catch((error) => {
        console.log("Unable to connect to MongoDB!");
        console.error(error);});


//Connect the route to the landing page: http://localhost3000
//in http://localhost3000 , we have login page


app.use('/' , userController);
//