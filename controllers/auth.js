const express = require('express')
const User = require('../models/userModel')
const passport = require('../config/ppConfig')
const router = express.Router()

router.get('/signup', function (req, res) {
  res.render('auth/signup', { user: req.user })
})

router.post('/signup', function (req, res, next) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function (err, createdUser) {
    if (err) {
      req.flash('error', 'Could not create user account')
      res.redirect('/auth/signup')
    } else {
      passport.authenticate('local', {
        successRedirect: '/room/list',
        successFlash: 'Account created and logged in'
      })(req, res)
    }
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/room/list',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in',
  failureFlash: 'Invalid username and/or password'
}))

router.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('/')
  } else {
    res.render('auth/login', {user: req.user})
  }
})

router.get('/logout', function (req, res) {
  req.logout()
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
