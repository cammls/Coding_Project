var express          = require('express')
var apiQueriesRoutes  = express.Router()


// PIPEDRIVE REQUESTS
apiQueriesRoutes.post('/getdata', function(req, res){
  // TODO post user ID here
  var user_token = req.token
  res.send("HELLO")
})

module.exports = apiQueriesRoutes
