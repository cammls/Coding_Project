var express           = require('express')
var apiQueriesRoutes  = express.Router()
<<<<<<< HEAD
var path              = require('path')
var qryCtrl           = require('../controllers/queryController.js')


// PIPEDRIVE REQUESTS
apiQueriesRoutes.post('/getdata', function(req, res){
  // // TODO post user ID here
  // var user_token = req.token
  // res.send("HELLO")
  qryCtrl.getdata(req.body);
=======
var stripeAPI         = require('../services/stripeAPIQuery.js')

// PIPEDRIVE REQUESTS
apiQueriesRoutes.get('/stripe_data', function(req, res){
  // TODO post user ID here
    stripeAPI.stripe_charges(function(charges) {
      stripeAPI.stripe_balance(charges, function(charges, balance) {
        stripeAPI.stripe_customers(charges, balance, function(charges, balance, customers){
          res.json({charges ,balance, customers})
        })

      });
    });

>>>>>>> 3714a833a1af0c386311460b48761eda7153977d
})

module.exports = apiQueriesRoutes
