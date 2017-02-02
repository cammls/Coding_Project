var express          = require('express')
var apiQueriesRoutes  = express.Router()
var stripeAPI         = require('../services/stripeAPIQuery.js')

// PIPEDRIVE REQUESTS
apiQueriesRoutes.get('/stripe_data', function(req, res){
  // TODO post user ID here
    stripeAPI.stripe_charges(function(result) {
      stripeAPI.stripe_balance(result, function(charges, balance) {
       res.json({charges ,balance})
      });
    });

})

module.exports = apiQueriesRoutes
