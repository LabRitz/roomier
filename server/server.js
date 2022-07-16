const { application } = require('express');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// route handlers
const mainRouter = require('./routes/userroutes');

// define route handlers
app.use('/', mainRouter);
 

// FE: client -> index.js
// FE: client -> components -> (App, CreatePost, Home, Login, NavBar,Profile, Signup)

// respond with main app --> WATCH TO CHANGE INDEX.HTML
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

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




// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));


// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`)
})


//