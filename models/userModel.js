const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var emailRegex =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

var UserSchema = new mongoose.Schema({
  name: { type: String, minlength: [3, 'Require at least 3 characters'], maxlength: [99, 'Name must be less than 99 characters'] },
  email: { type: String, required: true, unique: true, lowercase: true, match: emailRegex },
  password: { type: String, required: true, minlength: [8, 'Password length too short'] },
  room: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  host: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
})

UserSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  var hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password
    return ret
  }
}

module.exports = mongoose.model('User', UserSchema)
