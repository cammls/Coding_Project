var path          = require('path')
var user          = require('../models/userModel.js')
var test          = require('../services/jswtService.js')
var config        = require(path.join(__dirname, '../config/config.js'))

// End of to authenticate user before action

var register = function(user_data, res) {
  // TO DO VALIDATIONS OF USER_DATA (PURPOSE OF A CONTROLLER) !!
  user.registerUser(user_data, function(response, token) {
    if (response === "success") {
      res.status(200)
      res.json({
        "token"   : token,
        "success" : "Merci pour la création de votre compte !"
      });
    } else if (response === "failure" || token === "notoken") {
      res.status(400)
      res.json({
        "error" : "Impossible de créer votre compte veuillez réessayer"
      });
    }
  })
}

var login = function(req, res) {

}

var logout = function(req, res) {

}

exports.register  = register
exports.login     = login
exports.logout    = logout
