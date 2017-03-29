var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/chatrooms', function(req, res, next) {
  res.render('chatrooms', {title: 'Chatrooms'});
});

module.exports = router;
