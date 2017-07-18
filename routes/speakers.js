const express = require('express')
const passport = require('passport')

const speakerController = express.Router()

const Speaker = require('../models/speakers.js')

// (req, res, next) => {
//   if (req.user && req.user.authenticated) next()

//   res.redirect('/login')
// }

speakerController.get('/', (req,res) => {
  let user = req.user
  Speaker.find({}, (err, speakers) => {
    res.render('speakers', { speakers, user })
  })
})

speakerController.get('/add', (req,res) => {
  let user = req.user
  res.render('speakers/add', { user })
})

speakerController.post('/add', (req,res) => {
  let speaker = new Speaker({
    name: req.body.name,
    description: req.body.description,
    region: req.body.region,
    image: req.body.image,
    role: req.body.role
  })

  speaker.save()

  res.redirect(`/speakers/${ speaker._id }`)
})

speakerController.get('/:id', (req,res) => {
  let user = req.user
  Speaker.findOne({ '_id': req.params.id }, ( err, speaker ) => {
    res.render('speakers/view', {speaker, user})
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
    speaker.image = req.body.image
    speaker.role = req.body.role

    speaker.save()

    res.redirect(`/speakers/${ speaker._id }`)
  })
})

speakerController.get('/delete/:id', ( req, res ) => {
  Speaker.findOne({ '_id': req.params.id }, ( err, speaker ) => {
    speaker.remove()
    res.redirect('/')
  })
})

// add topic to speaker
speakerController.post('/:id', ( req, res ) => {
  Speaker.findOne({ '_id': req.params.id}, ( err, speaker ) => {
    let topicPost = {
      title: req.body.title,
      theme: req.body.theme,
      about: req.body.about
    }
    speaker.topics.push(topicPost)

    speaker.save()

    res.redirect(`/speakers/${speaker._id}`)
  })
})

module.exports = speakerController
