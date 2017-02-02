var stripe = require("stripe")(
  "sk_test_ulxAAGVDYrLbj7i4zc7NCWRU"
);
var stripe_charges = function(callback) {
stripe.charges.list(
  // { limit: 3 },
  function(err, charges) {
    // asynchronously called
     callback(charges)
  });
}
var stripe_balance = function(res ,callback) {
  stripe.balance.retrieve( function(err, balance) {
    // asynchronously called
    if (err)
    console.log(err)

    callback(res,balance)
  });
  }

  var stripe_customers = function(res, res2, callback){
    stripe.customers.list(
      function(err, customers) {
        if (err)
        console.log(err)
        // asynchronously called
        callback(res, res2, customers)
      }
    );
  }
exports.stripe_charges = stripe_charges
exports.stripe_balance = stripe_balance
exports.stripe_customers = stripe_customers
