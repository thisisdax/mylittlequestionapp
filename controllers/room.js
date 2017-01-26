const express = require('express')
const Room = require('../models/roomModel')
const User = require('../models/userModel')
const Poll = require('../models/pollModel')
const Question = require('../models/questionModel')
const router = express.Router()

router.get('/join', function (req, res) {
  if (req.user) {
    res.render('room/join', {user: req.user})
  } else {
    req.flash('error', 'Please login')
    res.redirect('/auth/login')
  }
})

router.put('/join', function (req, res) {
  Room.findOne({room: req.body.room}, (err, room) => {
    if (room === null || err) {
      req.flash('error', 'No room found')
      return res.redirect('/room/join')
    }
    if (room.host.equals(req.user.id)) {
      req.flash('error', 'Unable to join own room')
      return res.redirect('/room/join')
    }
    User.findOne({_id: req.user.id}, (err, user) => {
      if (err) {
        req.flash('error', 'An error occured')
        return res.redirect('/room/join')
      }
      User.find({_id: req.user.id, room: room.id}, (err, userAvail) => {
        if (err) return req.flash('error', err)
        if (userAvail.length) {
          req.flash('error', 'You have already joined the room')
          res.redirect('/room/list')
        } else {
          user.room.push(room.id)
          room.users.push(req.user.id)
          user.save()
          room.save()
          req.flash('success', 'You joined a new room!')
          res.redirect('/room/list')
        }
      })
    })
  })
})

router.get('/create', function (req, res) {
  if (req.user) {
    res.render('room/create', {user: req.user})
  } else {
    req.flash('error', 'Please login')
    res.redirect('/auth/login')
  }
})

router.post('/create', function (req, res) {
  Room.find({room: req.body.room}, (err, docs) => { // genius coder wrote this in less than 1min
    if (err) {
      req.flash('error', 'Unable to create room')
      return res.redirect('/room/create')
    }
    if (docs.length > 0) {
      req.flash('error', 'Room name exists liao')
      return res.redirect('/room/create')
    } else {
      Room.create({
        room: req.body.room,
        host: req.user._id
      }, function (err, room) {
        User.findOne({_id: req.user._id}, (err, user) => {
          if (err) {
            req.flash('error', 'Error in creating room')
            return res.redirect('/room/create')
          }
          user.host.push(room._id)
          user.save()
        })
        if (err) {
          req.flash('error', 'Unable to create room')
          return res.redirect('/room/create')
        } else {
          return res.redirect('/room/list')
        }
      })
    }
  })
})

router.get('/list', function (req, res) {
  if (req.user) {
    Room.find({host: req.user._id}, function (err, room) {
      if (err) return console.log(err)
      User.findById(req.user._id).populate('room')
      .exec(function (err, joinroom) {
        if (err) return console.log(err)
        res.render('room/list', {room: room, joinroom: joinroom.room, user: req.user})
      })
    })
  } else {
    req.flash('error', 'Please login')
    res.redirect('/auth/login')
  }
})

router.delete('/list/:id', function (req, res) {
  Room.findById(req.params.id).populate('question').exec(function (err, docs) {
    if (err) return console.log(err)
    if (docs.host.equals(req.user.id)) {
      docs.users.forEach(function (uid) {
        User.findById(uid, function (err, userRemRoom) {
          if (err) return console.log(err)
          userRemRoom.room.splice(userRemRoom.room.indexOf(req.params.id, 1))
          userRemRoom.save()
        })
      })
      docs.question.forEach(function (qid) {
        Question.findOneAndRemove({_id: qid._id}, function (err) {
          if (err) return console.log(err)
        })
      })
      User.findById(req.user.id, function (err, user) {
        if (err) return console.log(err)
        user.host.splice(user.host.indexOf(req.params.id, 1))
        user.save()
      })
      Room.findOneAndRemove({_id: req.params.id}, function (err, room) {
        if (err) return console.log(err)
        Poll.findOneAndRemove({room: req.params.id}, function (err, poll) {
          if (err) return console.log(err)
          return res.redirect('/room/list')
        })
      })
    } else {
      User.findById(req.user.id, function (err, user) {
        if (err) return console.log(err)
        user.room.splice(user.room.indexOf(docs.host), 1)
        user.save()
      })
      Room.findById(req.params.id, function (err, room) {
        if (err) return console.log(err)
        room.users.splice(room.users.indexOf(req.user.id), 1)
        room.save()
      })
      return res.redirect('/room/list')
    }
  })
})

module.exports = router
