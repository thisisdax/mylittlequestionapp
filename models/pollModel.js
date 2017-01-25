const mongoose = require('mongoose')

var PollSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  poll: { type: String, required: true, maxlength: 150 },
  one: { type: String },
  two: { type: String },
  three: { type: String },
  four: { type: String },
  choice: {
    onnu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rendu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    muunu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    naalu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Poll', PollSchema)
