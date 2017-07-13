const express = require('express')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


// connection to my DB
mongoose.connect('mongodb://sundi:11241602@pokedex-shard-00-00-pyl4x.mongodb.net:27017,pokedex-shard-00-01-pyl4x.mongodb.net:27017,pokedex-shard-00-02-pyl4x.mongodb.net:27017/pokedex?ssl=true&replicaSet=pokedex-shard-0&authSource=admin')

const app = express()
const appController = require('./routes/index.js')
const speakerController = require('./routes/speakers.js')

const Speaker = require('./models/speakers.js')

app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'TaylorSwiftFan2017',
    resave: false, // don't resave to the session on every request
    saveUninitialized: false //only save completed logins
}))

app.use(passport.initialize())
app.use(passport.session())

// configure passport
const User = require('./models/user.js')
passport.use(new LocalStrategy(User.authenticate()))

// local strategy with our user model
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use( express.static('public') )

app.use('/', appController)
app.use('/speakers', speakerController)

app.listen(3000)
