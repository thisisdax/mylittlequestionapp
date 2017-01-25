const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')

passport.serializeUser(function (user, done) {
  // console.log(2);
  done(null, user.id) // this second argument -----------
}) //                                                    |
//                                                       V
passport.deserializeUser(function (user, done) { // goes to the first argument here
  // console.log(3);
  User.findById(user, function (err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy({ // when you login your details goes here |
  usernameField: 'email', // <---------------------------------------------
  passwordField: 'password' // it gets passes into the following function |
}, function (email, password, done) { // <---------------------------------
  User.findOne({ email: email }, function (err, user) { // find the database for a matching email and returns all the data in an object called user in the second parameter
    // console.log(user);
    if (err) return done(err)
    if (!user) return done(null, false, { message: 'Incorrect email/password.' })
    if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect email/password.' })
    // console.log(1);
    return done(null, user) // when you sign in, passport uses the local strategy, and it starts from here.
  })
}))

module.exports = passport
