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
  // poll.choices.map(function (choice, index, array) {
  //   console.log('outside the if');
  //   if (choice === '') {
  //     console.log('inside the if');
  //     array.splice(index, 1)
  //   }
  // })
  // for (let i = 0; i < poll.choices.length; i++) {
  //   if (poll.choices[i] === '') {
  //     poll.choices.splice(i, 1)
  //   }
  // }
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

// 0: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// 1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// 2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// 3: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
