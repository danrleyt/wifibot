let express = require('express')
let bodyParser = require('body-parser')
let userRoutes = require('../api/routes/user')
let residenceRoutes = require('../api/routes/residence')

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}


module.exports = function () {
  let app = express()
  let macs = [];
 
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(allowCrossDomain)
  app.post('/macs', function(req, res){
    macs = req.body.macs;
    res.status(200).json({
      status: 200,
      message: 'macs updated'
    })
  })
  app.get('/macs', function(req, res) {
    if(macs.length > 0) {
      res.status(200).json(macs)
    } else {
      res.status(200).json(
        {
          status: 200,
          message: 'no macs'
        }
      )
    }
  })
  userRoutes(app)
  
  return app
}
