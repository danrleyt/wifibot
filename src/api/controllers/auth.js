let User = require('../models/user')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
require('dotenv').load()

module.exports.signIn = function (req, res) {
  let promise = User.findOne({ email: req.body.email })
  promise.then(
    function (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ id: user._id }, process.env.SECRET)
        res.status(200).json({
          id: user._id,
          token,
          message: 'Logged',
          email: user.email
        })
      } else {
        res.status(404).json({
          error: 404,
          message: "User or password not valid",
        })
      }
    }
  )
    .catch(
      function (error) {
        res.status(error.status).json(
          {
            error: error.status,
            message: "Problem while creating user.",
            errorMessage: error.message
          }
        )
      }
    )
}

module.exports.verifyToken = function (req, res, next) {
  jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(401).json({
        error: err.status,
        message: "Token not valid.",
        errorMessage: err.message
      })
    } else {
      next()
    }
  })
}