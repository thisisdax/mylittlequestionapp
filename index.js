require('dotenv').config({ silent: true })
const express = require('express')
const app = express()
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const auth = require('./controllers/auth')
const room = require('./controllers/room')
const question = require('./controllers/question')
const poll = require('./controllers/poll')
var isLoggedIn = require('./middleware/isLoggedIn')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mylittlequestionapp');
mongoose.Promise = global.Promise

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(function (req, res, next) {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})
app.get('/', (req, res) => {
  res.render('index', { user: req.user })
})
app.use('/auth', auth)
app.use('/room', room)
app.use(isLoggedIn)
app.get('/profile', function (req, res) {
  res.render('profile')
})
app.use('/question', question) // check this one
app.use('/question', poll)
const server = app.listen(process.env.PORT || 3000)

module.exports = server
