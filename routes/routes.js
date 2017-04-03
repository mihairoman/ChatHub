/* GET home page. */
module.exports = function (express) {
  var router = express.Router()

  router.get('/', function (req, res, next) {
    res.render('index', {title: 'ChatHub'})
  })

  router.get('/chatrooms', function (req, res, next) {
    res.render('chatrooms', {title: 'Chatrooms'})
  })

  router.get('/setcolor', function (req, res, next) {
    req.session.favColor = 'Red'
    res.send('Setting favorite color')
  })

  router.get('/getcolor', function (req, res, next) {
    res.send('Favorite color: ' + (req.session.favColor === undefined ? ' Not Found ' : req.session.favColor))
  })

  return router
}
