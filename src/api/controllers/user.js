let User = require('../models/user')
let bcrypt = require('bcrypt')
const env = require('dotenv')

env.load()

module.exports.addUser = function (req, res) {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, parseInt(process.env.SALTS))
  })

  let promise = User.create(user)

  promise
  .then(
    (user) => {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    }
  )
  .catch(
    (error) => {
      res.status(500).json({
        error: 500,
        message: "Problem while creating user.",
        errorMessage: error.message
      })
    }
  )
}

module.exports.findAll = function(req, res) {
  let promise = User.find()
  promise
  .then(
    (users) => {
      res.status(200).json(users)
    }
  )
  .catch(
    (error) => {
      res.send(500).json({
        error: 500,
        message: "Problem while finding users.",
        errorMessage: error.message
      })
    }
  )
}