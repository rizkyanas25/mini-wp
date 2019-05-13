const User = require('../models/user')
const { hash } = require('../helpers/bcryptjs')
const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
// const { OAuth2Client } = require('google-auth-library');

class UserController {
  static create(req, res) {
    let { name, email, password } = req.body
    let hashed = (password != '') ? hash(password) : password
    let newUser = {
      name, 
      email,
      password: hashed,
      profilePic : req.file.cloudStoragePublicUrl
    }
    User.create(newUser)
      .then(data => {
        res.status(201).json({ data })
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findOne(req, res) {
    User.findOne({ _id: req.params.id })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => { res.status(500).json({ message: err.message }) })
  }
  static update(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static delete(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(user => {
        const response = {
          message: 'Successfully deleted user.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => { res.status(500).json({ message: err.message }) })
  }

  static login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: 'wrong email/password' })
        } else {
          // console.log({user: user.password, input: req.body.password})
          // console.log(compare(req.body.password, user.password) || req.body.password == user.password)
          if (!compare(req.body.password, user.password)) {
            res.status(401).json({ message: 'wrong email/password' })
          } else if (compare(req.body.password, user.password) || req.body.password == user.password) {
            let obj = {
              name: user.name,
              email: user.email,
              id: user._id
            }
            let access_token = sign(obj)
            res.status(201).json({ 
              access_token,
              name: user.name,
              email: user.email,
              id: user._id,
              profilePic : user.profilePic
             })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message })
      })
  }
}

module.exports = UserController