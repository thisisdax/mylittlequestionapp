const mongoose = require('mongoose')

var PollSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  qns: { type: String, required: true, maxlength: 150 },
  choices: { type: Array, default: null },
  coll: { type: Array },
  total: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  running: { type: Boolean, default: true }
})

PollSchema.pre('save', function (next) {
  var poll = this
  var filtered = poll.choices.filter(function (choice, index, array) {
    if (choice === '') {
      return false
    } else {
      return true
    }
  })
  poll.choices = filtered
  next()
})

module.exports = mongoose.model('Poll', PollSchema)
