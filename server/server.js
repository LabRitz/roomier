const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const expressSession = require('express-session');

dotenv.config( {path: './config/config.env'})

const passport = require('passport');

app.use(express.json());

app.use(expressSession({
    secret: "google auth",
    resave: false,
    saveUninitialized: false,
    })
  )

require('../config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/auth/google', passport.authenticate('google', { scope: ['profile'] }))

app.get('/login/auth/google/callback', passport.authenticate('google', { failureDirect: '/'}), (req, res) => {
    res.redirect('/');
})

app.listen(3000, () => {
    console.log("Connected to port 3000")
})

