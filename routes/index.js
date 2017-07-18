const express = require('express')
const passport = require('passport')
const appController = express.Router()

const Speaker = require('../models/speakers.js')

const User = require('../models/user.js')

// *** step 1. signup ****
appController.get('/signup', function( req, res ) {
  res.render('signup', {})
})

// post the signup request
appController.post('/signup', function( req, res ) {
  User.register(new User({
    username: req.body.username
  }),
  req.body.password,
  (err, user) => {
    if (err) {
      // HANDLE ERRORS HERE (err.message)
      console.log(err)
      return res.render('signup', { user : user})
    }
    // local refers to our strategy (local)
    passport.authenticate('local')(req, res, () => {
      res.redirect('/speakers')
    })
  })
})

// *** login routes ***
appController.get('/login', function( req, res ) {
  if (req.user) {
    res.redirect('/speakers')
  } else {
    res.render('login', {user: req.user})
  }
})

appController.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/speakers')
})

appController.get('/logout', ( req, res ) => {
  req.logout()
  res.redirect('/about')
})

// change the following two gets to be within login

appController.get('/', ( req, res ) => {
  Speaker.find({}, ( err, speakers ) => {
    res.render('index', { speakers, user: req.user })
  })
})

appController.get('/about', ( req, res ) => {
  res.render('about', {user: req.user})
})

module.exports = appController
