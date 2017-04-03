module.exports = function (mongoose) {
  var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname: String
  })

  var User = mongoose.model('users', UserSchema)

  return User
}
