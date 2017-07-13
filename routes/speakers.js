const express = require('express')
const passport = require('passport')

const speakerController = express.Router()

const Speaker = require('../models/speakers.js')

speakerController.get('/', (req, res, next) => {
  if (req.user && req.user.authenticated) next()

  res.redirect('/login')
}, (req,res) => {
  let user = req.user
  console.log( user )
  Speaker.find({}, (err, speakers) => {
    res.render('speakers/index', { speakers, user })
  })
})

speakerController.get('/new', (req,res) => {
  res.render('speakers/new')
})

speakerController.post('/new', (req,res) => {
  let speaker = new Speaker({
    name: req.body.name,
    description: req.body.description,
    region: req.body.region,
    topics: {
      title: req.body.title,
      theme: req.body.theme
    }
  })

  speaker.save()

  res.redirect(`/speakers/${ speaker._id }`)
})

speakerController.get('/:id', (req,res) => {
  Speaker.findOne({ '_id': req.params.id }, ( err, speaker ) => {
    res.render('speakers/show', speaker)
  })
})

speakerController.get('/edit/:id', (req, res) => {
  Speaker.findOne({'_id': req.params.id}, (err, speaker) => {
    res.render('speakers/edit', speaker)
  })
})

speakerController.post('/edit/:id', (req, res) => {
  Speaker.findOne({ '_id': req.params.id }, (err, speaker) => {
    speaker.name = req.body.name
    speaker.description = req.body.description
    speaker.region = req.body.region

    // how to do
    // speaker.topic = {
    //   speaker.title: req.body.title,
    //   speaker.theme: req.body.theme
    // }


    speaker.save()

    res.redirect(`/speakers/${ speaker._id }`)
  })
})

module.exports = speakerController
