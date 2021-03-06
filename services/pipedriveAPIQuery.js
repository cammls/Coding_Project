// MISC REQUESTS
var rp      = require('request-promise')
var config  = require('../config/config.js')
var Pipedrive = require('pipedrive');

// Global prefix url
const PIPEDRIVE_PREFIX = "https://api.pipedrive.com/v1/"
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

var pipedrive = new Pipedrive.Client(config.pipedrivetoken, { strictMode: true });

var get_pipedrive_deals = function(error, callback) {
  // console.log('    svc->');
  pipedrive.Deals.getAll({}, function(err, payload) {
    if (err) {
      // console.log('    <-error');
      callback(err, null)
    } else {
      // console.log('    <-json');
      callback(null, payload)
    }
  })
}

exports.get_pipedrive_deals = get_pipedrive_deals
