const express = require('express')
const Room = require('../models/roomModel')
// const User = require('../models/userModel')
const Poll = require('../models/pollModel')
const Question = require('../models/questionModel')
const router = express.Router()

router.get('/list/:id', function (req, res) {
  if (req.user) {
    Room.findById(req.params.id).populate('question').exec(function (err, room) {
      if (err) return console.log(err)
      Poll.find({room: req.params.id, running: true}, function (err, check) {
        if (err) return console.log(err)
        res.render('room/lobby', {room: room, user: req.user, check: check})
      })
    })
  } else {
    req.flash('error', 'Please login')
    res.redirect('/auth/login')
  }
})

router.put('/approve/:id', function (req, res) {
  Question.findById(req.params.id).populate('room').exec((err, question) => {
    if (err) return req.flash('error', err)
    question.approved = true
    question.save()
    res.redirect('/question/list/' + question.room.id)
  })
})

router.put('/unapprove/:id', function (req, res) {
  Question.findById(req.params.id).populate('room').exec((err, question) => {
    if (err) return req.flash('error', err)
    question.approved = false
    question.save()
    res.redirect('/question/list/' + question.room.id)
  })
})

router.put('/vote/:id', function (req, res) {
  Question.findById(req.params.id).populate('room').exec((err, question) => {
    if (err) return req.flash('error', err)
    if (question.votes.indexOf(req.user.id) < 0) {
      question.votes.push(req.user.id)
    } else {
      question.votes.splice(question.votes.indexOf(req.user.id), 1)
    }
    question.save()
    res.redirect('/question/list/' + question.room.id)
  })
})

router.post('/create/:id', function (req, res) {
  console.log('req.bodycreate', req.body)
  Question.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
    room: req.params.id
  }, function (err, createdQuestion) {
    if (err) {
      req.flash('error', 'Could not create question')
      return res.redirect('/question/list')
    } else {
      Room.findOne({_id: createdQuestion.room}, function (err, room) {
        if (err) return console.log(err)
        room.question.push(createdQuestion)
        room.save()
      })
      req.flash('success', 'You posted question')
      res.redirect('/question/list/' + createdQuestion.room)
    }
  })
})

router.delete('/remove/:id', function (req, res) {
  Question.findOne({_id: req.params.id}, function (err, question) {
    if (err) return console.log(err)
    console.log('question.room', question._id)
    Room.findById(question.room, function (err, room) {
      if (err) return console.log(err)
      room.question.splice(room.question.indexOf(question._id), 1)
      room.save()
      Question.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) return console.log(err)
        req.flash('success', 'Question has been removed!')
        return res.redirect('/question/list/' + room._id)
      })
      return console.log('Question deleted! Room saved!')
    })
  })
})

module.exports = router
