module.exports = function (passport, Strategy, config, mongoose) {
  var ChatUserSchema = new mongoose.Schema({
    profileID: String,
    fullname: String,
    avatar: String
  })

  var ChatUser = mongoose.model('chatUser', ChatUserSchema)

  passport.use(new Strategy({
    consumerKey: config.tw.appID,
    consumerSecret: config.tw.appSecret,
    callbackURL: config.tw.callbackURL
  }, function (token, tokenSecret, profile, done) {
      // check if user exists in the DB, if not, create one and return the profile
    ChatUser.findOne({'profileID': profile.id}, function (err, result) {
      if (err) {
        throw new Error('Something went wrong')
      }
      var newUser = new ChatUser({
        profileID: profile.id,
        fullname: profile.displayName
      })

      // newChatUser.save(function (err) {
      //   done(null, newUser)
      // })
    })
  }))
}
