var path          = require('path')
var user          = require('../models/userModel.js')
var test          = require('../services/jswtService.js')
var config        = require(path.join(__dirname, '../config/config.js'))
var algoliasearch = require('algoliasearch')
var client        = algoliasearch('7G7ED6C2ZX', '4901abfb3e83b3d3b6c52cdbd1677f9b')
var index         = client.initIndex('user')
var cloudinary    = require('cloudinary')

// End of to authenticate user before action

var register = function(user_data, user_picture, res) {
  // TO DO VALIDATIONS OF USER_DATA (PURPOSE OF A CONTROLLER) !!
  console.log(user_picture)
  // TO DO SEND FILE TO CLOUDINARY
  // AND GET URL
  user.registerUser(user_data, function(response, token) {

    if (response === "success") {
      res.status(200)
      res.json({
        "token"   : token,
        "success" : "Merci pour la création de votre compte !"
      });

      //Adding the user to Algolia's database
      index.addObject({
        first_name: user_data.first_name,
        last_name: user_data.last_name,
        email: user_data.email
      }, function(err, content) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(content);
      });

    } else if (response === "failure" || token === "notoken") {
      res.status(400)
      res.json({
        "error" : "Impossible de créer votre compte veuillez réessayer"
      });
    }
  })
}

var login = function(user_data, res) {
  // TO DO VALIDATIONS OF USER_DATA (PURPOSE OF A CONTROLLER) !!
  user.loginUser(user_data, function(response, token) {
    if (response === "success") {
      res.status(200)
      res.json({
        "token"   : token,
        "success" : "Ravis de vous revoir !"
      });
    } else {
      res.status(400)
      res.json({
        "error" : "Mauvaise combinaison email/mot de passe"
      });
    }
  })
}

var logout = function(user_data, res) {
  // TO DO VALIDATIONS OF USER_DATA (PURPOSE OF A CONTROLLER) !!
  user.logoutUser(user_data, function(response, token) {
    if (response === "success") {
      res.status(200)
      res.json({
        "success" : "Merci de votre visite et à bientôt !"
      });
    } else {
      res.status(400)
      res.json({
        "error" : "Un problème technique est subvenu, corrigé dans l'heure"
      });
    }
  })
}

exports.register  = register
exports.login     = login
exports.logout    = logout
