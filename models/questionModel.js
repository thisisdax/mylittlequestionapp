const mongoose = require('mongoose')

var QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 150 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  approved: { type: Boolean, default: false }
})

module.exports = mongoose.model('Question', QuestionSchema)
