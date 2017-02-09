var path          = require('path')
var user          = require('../models/userModel.js')
var test          = require('../services/jswtService.js')
var config        = require(path.join(__dirname, '../config/config.js'))
var algoliasearch = require('algoliasearch')
var client        = algoliasearch('7G7ED6C2ZX', '4901abfb3e83b3d3b6c52cdbd1677f9b')
var index         = client.initIndex('user')
var config        = require('../config/config.js')
var cloudinary    = require('cloudinary')

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
});

// End of to authenticate user before action

var register = function(user_data, user_picture, res) {
  cloudinary.uploader.upload(
    user_picture.path,
    function(result) {
      var picture_url = result.eager[0].secure_url
      user.registerUser(user_data, picture_url, function(response, token) {
        console.log(response)
        console.log(token)
        if (response === "success") {
          res.status(200)
          res.json({
            "token"   : token,
            "success" : "Merci pour la création de votre compte !"
          });

          //Adding the user to Algolia's database
          // index.addObject({
          //   first_name: user_data.first_name,
          //   last_name: user_data.last_name,
          //   email: user_data.email
          // }, function(err, content) {
          //   if (err) {
          //     console.error(err);
          //     return;
          //   }
          //   console.log(content);
          // });

        } else if (response === "failure" || token === "notoken") {
          res.status(400)
          res.json({
            "error" : "Impossible de créer votre compte veuillez réessayer"
          });
        }
      })
    }, { crop: 'limit',
         width: 2000,
         height: 2000,
         eager: [
          { width: 200, height: 200, crop: 'thumb', gravity: 'face',
            radius: 100 },
         ],
        tags: ['user', 'profile picture']
    }
  )
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
