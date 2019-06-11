let user = require('../controllers/user')
let auth = require('../controllers/auth')

module.exports = function (app) {
  app.post('/api/users', user.addUser)
  app.post('/api/auth', auth.signIn)
  app.use(auth.verifyToken)
  app.get('/api/users', user.findAll)
}