require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../db/userModel');
const axios = require('axios');

function googleAuth(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/login/auth/google/callback',
    }, 
    async(accessToken, refreshToken, profile, done) => {
    //   console.log(profile);

      const { given_name, family_name, email } = profile._json;
      const sub = profile._json.sub;

      // console.log('in access')
      // console.log(profile)

      const userBody = {
        firstName: given_name,
        lastName: family_name,
        username: email,
        password: sub,
        zipCode: 10001
      };

      try {
        let login = await axios.post("http://localhost:3000/", {
            username: email,
            password: sub
          },
        );

        console.log('login in passport.js: ', login.data);

        if (login.data !== null) {
            done(null, login);
        }

        else {
            let signup = await axios.post("http://localhost:3000/signup", userBody);

            await axios.post("http://localhost:3000/", {
                username: email,
                password: sub
            });

            // console.log('signup: ', signup);

            done(null, signup)
        }

      } catch (err) {
        console.log("err: ", err);
      }
    })
  )
  
  passport.serializeUser((user, done) => {
    done(null, user.data._id);
  })

  passport.deserializeUser((id, done) => {
    console.log('userId in passport.deserializeUser', id);
    User.findById(id, (err, user) => done(err, user))
  })
}

module.exports = googleAuth;