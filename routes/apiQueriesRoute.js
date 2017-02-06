var express           = require('express')
var apiQueriesRoutes  = express.Router()
var path              = require('path')
var qryCtrl           = require('../controllers/queryController.js')
var stripeAPI         = require('../services/stripeAPIQuery.js')

// PIPEDRIVE REQUESTS
apiQueriesRoutes.post('/fetchpipedrive', qryCtrl.prepareQuery);

// STRIPE REQUESTS
apiQueriesRoutes.get('/stripe_data', function(req, res){
  // TODO post user ID here
    stripeAPI.stripe_charges(function(charges) {
      stripeAPI.stripe_balance(charges, function(charges, balance) {
        stripeAPI.stripe_customers(charges, balance, function(charges, balance, customers){
          res.json({charges ,balance, customers})
        })
      });
    });
})

module.exports = apiQueriesRoutes
