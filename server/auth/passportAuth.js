module.exports = function (passport, Strategy, config, mongoose) {
  var ChatUserSchema = new mongoose.Schema({
    profileID: String,
    fullname: String,
    avatar: String
  })

  var ChatUserModel = mongoose.model('chatUser', ChatUserSchema)

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    ChatUserModel.findById(id, function (err, user) {
      if (err) {
        done(err, null)
      }
      done(null, user)
    })
  })

  passport.use(new Strategy({
    consumerKey: config.tw.appID,
    consumerSecret: config.tw.appSecret,
    callbackURL: config.tw.callbackURL
  }, function (token, tokenSecret, profile, done) {
      // check if user exists in the DB, if not, create one and return the profile
    ChatUserModel.findOne({'profileID': profile._json.id_str}, function (err, result) {
      if (err) {
        done(err, null)
      }
      if (result) {
        done(null, result)
      } else {
        var newUser = new ChatUserModel({
          profileID: profile._json.id_str,
          fullname: profile._json.name,
          avatar: profile._json.profile_image_url || ''
        })
        newUser.save(function (err) {
          if (err) {
            done(err, null)
          }
          done(null, newUser)
        })
      }
    })
  }))
}
