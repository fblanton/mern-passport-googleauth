// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
  console.log('loading dev environments')
  require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  console.log('YOU ARE IN THE PRODUCTION ENV')
  app.use('/static', express.static(path.join(__dirname, '../build/static')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/'))
  })
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

/* Set up app.use('/api', require('./api')) above here if you implement an api. Follow similar structure to the ./auth/index.js for an ./api/index.js you make or any other routes you want to handle */

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log('====== ERROR =======')
  console.error(err.stack)
  res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})
