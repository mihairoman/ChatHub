var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var session = require('express-session')
var config = require('./server/config/config')
var ConnectMongo = require('connect-mongo')(session)
var mongoose = require('mongoose').connect(config.dbURL)
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy

var router = require('./server/routes/routes')(express, passport)
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'server/views'))
app.engine('html', require('hogan-express'))
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'server/public')))

var env = process.env.NODE_ENV || 'production'

if (env === 'development') {
  console.log('Development mode')
  app.use(session({secret: config.sessionSecret, resave: true, saveUninitialized: true}))
} else {
  console.log('Production mode')
  app.use(session({secret: config.sessionSecret,
    store: new ConnectMongo({
      // url: config.dbURL,
      mongooseConnection: mongoose.connections[0],
      stringify: true
    }),
    resave: true,
    saveUninitialized: true}))
}

app.use(passport.initialize())
app.use(passport.session())

require('./server/auth/passportAuth')(passport, TwitterStrategy, config, mongoose)
app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (env === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    console.dir(err)
    res.render('error', {
      message: err.message,
      error: JSON.stringify(err)
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
