var securePages = require('./securePages')
/* GET home page. */
module.exports = function (express, passport) {
  var router = express.Router()

  router.get('/', function (req, res, next) {
    res.render('index', {title: 'ChatHub'})
  })

  router.get('/auth/twitter', passport.authenticate('twitter'))

  router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/chatrooms',
    failureRedirect: '/'
  }))

  router.get('/chatrooms', securePages, function (req, res, next) {
    res.render('chatrooms', { title: 'Chatrooms', user: req.user })
  })

  router.get('/logout', function (req, res, next) {
    req.logout()
    res.redirect('/')
  })

  return router
}
