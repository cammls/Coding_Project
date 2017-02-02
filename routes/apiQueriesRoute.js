var express           = require('express')
var apiQueriesRoutes  = express.Router()
var path              = require('path')
var qryCtrl           = require('../controllers/queryController.js')


// PIPEDRIVE REQUESTS
apiQueriesRoutes.post('/getdata', function(req, res){
  // // TODO post user ID here
  // var user_token = req.token
  // res.send("HELLO")
  qryCtrl.getdata(req.body);
})

module.exports = apiQueriesRoutes
