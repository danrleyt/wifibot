let mongoose = require('mongoose')

module.exports = function() {
  let schema = mongoose.Schema({
    name: {
      type: String
    },
    MAC: {
      type: String,
      unique: true
    }
  })

  return mongoose.model('device', schema)
}()
