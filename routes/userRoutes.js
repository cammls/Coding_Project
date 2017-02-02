var express       = require('express')
var userRoutes    = express.Router()
var path          = require('path')
var ctrlAuth      = require(path.join(__dirname, '../controllers/authenticationController.js'))

// login

userRoutes.post('/register', function(req, res){

    var user_data = req.body
    ctrlAuth.register(user_data)
});

// CRUD users routes ===========================================================

// Create / Register
userRoutes.post('/users', function (req, res) {


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
