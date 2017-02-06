var express           = require('express')
var apiQueriesRoutes  = express.Router()
var path              = require('path')
var qryCtrl           = require('../controllers/queryController.js')

// PIPEDRIVE REQUESTS
apiQueriesRoutes.post('/fetchpipedrive', qryCtrl.prepareQuery);

module.exports = apiQueriesRoutes
