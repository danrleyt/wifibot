let mongoose = require('mongoose')

module.exports = function () {
  let schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    devices: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'device' }
    ],
    residences: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'residence' }
    ]
  })
  return mongoose.model('user', schema)
}()
