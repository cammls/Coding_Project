var path          = require('path')
var user          = require('../models/userModel.js')
var jwt           = require('express-jwt')
var config        = require(path.join(__dirname, '../config/config.js'))

// To authenticate user before action

var auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});


var register = function(req, res) {
  console.log(req.body)
}

var login = function(req, res) {

}

var logout = function(req, res) {

}

exports.register  = register
exports.login     = login
exports.logout    = logout
