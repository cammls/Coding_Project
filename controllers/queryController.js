var path             = require('path')
var querySvc         = require('../services/pipedriveAPIQuery.js')
var config           = require('../config/config.js')

var prepareQuery = function(req, res) {
  // TODO -- QUERY API_TOKEN && VALIDATE QUERY PARAMS
  // if () {
  let token = config.pipedrivetoken
  querySvc.get_pipedrive_data(req.body, token, function(service_response, data){
    if ( service_response === 'success') {
      res.send({ 'pipedrive_json' : data})
    } else {
      res.send({ 'error' : data})
    }
  })
  // }
}

exports.prepareQuery = prepareQuery
