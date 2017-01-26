const express = require('express')
const Poll = require('../models/pollModel')
const router = express.Router()

router.post('/poll', function (req, res) {
  if (req.body.qns === '' || req.body.choices === '') {
    req.flash('error', 'You need a question...')
    return res.redirect('/question/list/' + req.body.room)
  } else {
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
  }
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

router.get('/poll/list/:id', function (req, res) {
  Poll.find({room: req.params.id, running: false}, function (err, poll) {
    console.log(poll);
    if (err) return console.log(err)
    res.render('room/polls', {poll: poll, user: req.user, key: req.params.id})
  })
})

module.exports = router
