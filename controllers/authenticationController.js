var path          = require('path')
var user          = require('../models/userModel.js')
var test          = require('../services/jswtService.js')
var config        = require(path.join(__dirname, '../config/config.js'))

// End of to authenticate user before action

var register = function(user_data) {
  // TO DO VALIDATIONS OF USER_DATA (PURPOSE OF A CONTROLLER) !!
  user.registerUser(user_data, function(token) {
    // decoded = test.decodeJswt(token)
  })
}

var login = function(req, res) {

}

var logout = function(req, res) {

}

exports.register  = register
exports.login     = login
exports.logout    = logout
