require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy

function googleAuth(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/login/auth/google/callback',
    }, 
    async(accessToken, refreshToken, profile, done) => {
      console.log(profile);
    })
  )
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}

module.exports = googleAuth;