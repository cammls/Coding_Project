var express       = require('express')
var userRoutes    = express.Router()
var path          = require('path')
var ctrlAuth      = require(path.join(__dirname, '../controllers/authenticationController.js'))

// TODO TODO TODO check before each action if token corresponds to a token in DB
// Register

userRoutes.post('/register', function(req, res){
  var user_data = req.body
  ctrlAuth.register(user_data, res)
});

// Login

userRoutes.post('/login', function (req, res) {
  var user_data = req.body
  ctrlAuth.login(user_data, res)
})

// Logout

userRoutes.post('/logout', function (req, res) {  
  var user_data = req.body
  ctrlAuth.logout(user_data, res)
});

// List all users in json

userRoutes.get('/users', function (req, res){

});

userRoutes.get('/users/:email', function(req,res){

});

// delete a user

userRoutes.delete('/users/:email/delete', function(req,res){

});

// edit users

userRoutes.put('/users/:email/edit', function(req, res){

})

module.exports = userRoutes
