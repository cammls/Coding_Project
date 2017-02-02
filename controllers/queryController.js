var path             = require('path')
// var user          = require('../models/userModel.js')
// var jwt           = require('express-jwt')
// var config        = require(path.join(__dirname, '../config/config.js'))
var querySvc         = require('../services/pipedriveAPIQuery.js')

var getdata = function(params) {
  console.log(params)
  querySvc.get_pipedrive_all_something(params.token)
  console.log('titi')
}

exports.getdata = getdata
