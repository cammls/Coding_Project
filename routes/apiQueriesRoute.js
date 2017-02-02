var express           = require('express')
var apiQueriesRoutes  = express.Router()
var path              = require('path')
var qryCtrl           = require('../controllers/queryController.js')

// PIPEDRIVE REQUESTS
apiQueriesRoutes.post('/fetchpipedrive', function(req, res){
  console.log('ROUTE:');
  console.log(req);
  console.log(res);
  console.log('======');
  qryCtrl.prepareQuery(req, res);
})

module.exports = apiQueriesRoutes
