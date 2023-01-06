require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../db/userModel');
const fetch = require('node-fetch');

const { DOMAIN, PROTOCOL, SERVER_PORT } = require('config')

function googleAuth(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/login/auth/google/callback',
    }, 
    async(accessToken, refreshToken, profile, done) => {
      const { given_name, family_name, email } = profile._json;
      const sub = profile._json.sub;

      const userBody = {
        firstName: given_name,
        lastName: family_name,
        username: email,
        password: sub,
        zipCode: 10001
      };

      try {
        //makes request to verify if user exists
        const res = await fetch(`${PROTOCOL}${DOMAIN}:${SERVER_PORT}/oauth`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: email,
            password: sub
          })
        });
        const loginJSON = await res.json();

        //if user already exists
        if (loginJSON) done(null, loginJSON);
        
        //if user does not exist
        else {
          //make request to create user
          const response = await fetch(`${PROTOCOL}${DOMAIN}:${SERVER_PORT}/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userBody)
          });
          const signupJSON = await response.json();

          //makes request to verify user
          await fetch(`${PROTOCOL}${DOMAIN}:${SERVER_PORT}/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: email,
              password: sub
            })
          });
          done(null, signupJSON)
        }
      } catch (err) {
        console.log("err: ", err);
      }
    })
  )
  
  passport.serializeUser((user, done) => {
    done(null, user);
  })

  passport.deserializeUser((user, done) => {
    User.findById(user._id, (err, user) => done(err, user))
  })
}

module.exports = googleAuth;