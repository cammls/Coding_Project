// Global prefix url
const PIPEDRIVE_PREFIX = "api.pipedrive.com/v1/"
// Get all deals
const GET_DEALS = "deals?start=0"
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
const GET_PERSONS = "products"
// Get detail of a product
const GET_DETAIL_OF_PERSON = "product/:id"
// Recent changes across all item types in Pipedrive (deals, persons, etc).
const GET_RECENTS = "recents"
// Get all Pipedrive users
const GET_USERS = "users"
// Get user connections
const GET_USERS_CONNECTIONS = "usersConnections"

var get_pipedrive_all_something = function(something, token) {
  
}

var get_pipedrive_details_of_something = function(something, id, token) {

}

exports.get_pipedrive_details_of_something = get_pipedrive_details_of_something
exports.get_pipedrive_all_something = get_pipedrive_all_something
