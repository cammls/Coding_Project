// MISC REQUESTS
var rp = require('request-promise')

// Global prefix url
const PIPEDRIVE_PREFIX = "api.pipedrive.com/v1/"
// Get all deals
const GET_DEALS = "/deals?start=0"
// Get detail of a deal
const GET_DETAIL_OF_DEAL = "deals/:id"
// Get all organizations
const GET_ORGANIZATIONS = "organizations"
// Get detail of organization
const GET_DETAIL_OF_ORGANIZATION = "organizations/:id"
// Get all persons
const GET_PERSONS = "persons"
// Get detail of a person
const GET_DETAIL_OF_PERSON = "persons/:id"
// Get all products
const GET_PRODUCTS = "products"
// Get detail of a product
const GET_DETAIL_OF_PRODUCT = "product/:id"
// Recent changes across all item types in Pipedrive (deals, persons, etc).
const GET_RECENTS = "recents"
// Get all Pipedrive users
const GET_USERS = "users"
// Get user connections
const GET_USERS_CONNECTIONS = "usersConnections"

var get_pipedrive_data = function(params, token, callback) {
  // api.pipedrive.com/v1/deals?start=0&limit=2&api_token=e698e510255054f5434c44c3124aaa7d17cb4b15
  // console.log(rp)
  var options = {
    uri: 'https://api.pipedrive.com/v1/deals?start=0&limit=2&api_token=e698e510255054f5434c44c3124aaa7d17cb4b15',
    // qs: {
    //   api_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    // },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
  .then(function(res) {
    console.log(res);
    callback('success', res.data)
    return res.data;
  })
  .catch(function(err) {
    console.log(err);
    return err;
  })
}

exports.get_pipedrive_data = get_pipedrive_data
