require('dotenv').config();
GoogleStrategy = require('passport-google-oauth20').Strategy

function googleAuth(passport) {
    passport.use(new GoogleStrategy({
        clientID: '242608651265-l7rmod0inedei6t1sjpob8h0fruul5vp.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/login/auth/google/callback',
    }, 
    async(accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}

module.exports = googleAuth;