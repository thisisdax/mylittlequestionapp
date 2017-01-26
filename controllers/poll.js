const express = require('express')
// const Room = require('../models/roomModel')
// const User = require('../models/userModel')
const Poll = require('../models/pollModel')
const router = express.Router()

router.post('/poll', function (req, res) {
  // Poll.find({room: req.body.room}, function (err, check) {
  //   if (err) return console.log(err)
  //   if (check === undefined) {
  Poll.create({
    room: req.body.room,
    qns: req.body.qns,
    choices: req.body.choices
  }, function (err, createdPoll) {
    if (err) {
      req.flash('error', 'Could not create poll')
      return res.redirect('/question/list' + req.body.room._id)
    } else {
      Poll.findById(createdPoll._id, function (err, poll) {
        if (err) return console.log(err)
        for (var i = 0; i < poll.choices.length; i++) {
          poll.coll.push(0) // must talk about this genius method also
        }
        poll.save()
      })
      req.flash('success', 'You created a poll!')
      return res.redirect('/question/list/' + req.body.room)
    }
  })
    // } else {
    //   req.flash('error', 'A poll has been created!')
    //   res.redirect('/question/list/' + req.body.room)
    // }
  // })
  // Poll.create({
  //   room: req.body.room,
  //   qns: req.body.qns,
  //   choices: req.body.choices
  // }, function (err, createdPoll) {
  //   if (err) {
  //     req.flash('error', 'Could not create poll')
  //     return res.redirect('/question/list' + req.body.room._id)
  //   } else {
  //     req.flash('success', 'You created a poll!')
  //     res.redirect('/question/list/' + req.body.room)
  //   }
  // })
})

router.put('/poll', function (req, res) {
  Poll.findById(req.body.id, function (err, poll) {
    if (err) return console.log(err)
    poll.coll[req.body.index] += 1
    poll.markModified('coll')
    poll.total.push(req.user.id)
    poll.save()
    req.flash('success', 'You answered a poll!')
    return res.redirect('/question/list/' + poll.room)
  })
})

router.put('/poll/stop', function (req, res) {
  Poll.findOneAndUpdate({_id: req.body.id}, req.body, function (err, poll) {
    if (err) return console.log(err)
    req.flash('success', 'You closed a poll!')
    return res.redirect('/question/list/' + poll.room)
  })
})

module.exports = router
