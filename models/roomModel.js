const mongoose = require('mongoose')

var RoomSchema = new mongoose.Schema({
  room: { type: String, required: true, maxlength: 40, unique: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
})

module.exports = mongoose.model('Room', RoomSchema)
