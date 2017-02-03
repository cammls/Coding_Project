var express       = require('express')
var userRoutes    = express.Router()
var path          = require('path')
var ctrlAuth      = require(path.join(__dirname, '../controllers/authenticationController.js'))
var ctrlUsers      = require(path.join(__dirname, '../controllers/userController.js'))

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
});

// Logout

userRoutes.post('/logout', function (req, res) {
  var token = req.body
  ctrlAuth.logout(user_data, res)
});

// List all users in json

userRoutes.get('/users', function (req, res){
  ctrlUsers.list(res)
});

// show user
userRoutes.get('/users/:id', function(req,res){
  var id= req.params.id
  ctrlUsers.show(id, res)
});

// delete a user

userRoutes.delete('/users/:id/delete', function(req,res){

});

// edit users

userRoutes.put('/users/:id/edit', function(req, res){

})

module.exports = userRoutes
