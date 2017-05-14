var securePages = require('./securePages')
/* GET home page. */
module.exports = function (express, passport) {
  var router = express.Router()

  // router.all('/', function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*')
  //   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  //   next()
  // })

  router.get('/', function (req, res, next) {
    res.render('index', {title: 'ChatHub'})
  })

  router.route('/auth/twitter')
    .get(enableCors, passport.authenticate('twitter'))

  router.get('/auth/twitter/callback', enableCors, passport.authenticate('twitter', {
    successRedirect: '/chatrooms',
    failureRedirect: '/'
  }))

  router.get('/chatrooms', securePages, enableCors, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.render('chatrooms', { title: 'Chatrooms', user: req.user })
  })

  router.get('/logout', function (req, res, next) {
    req.logout()
    res.redirect('/')
  })

  return router
}


function enableCors (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
}

