var express       = require('express')
var userRoutes    = express.Router()
var path          = require('path')
var jwt           = require('express-jwt')
var config        = require(path.join(__dirname, '../config/config.js'))
var ctrlAuth      = require(path.join(__dirname, '../controllers/authenticationController.js'))

// Authentication

// var auth = jwt({
//   secret: config.secret,
//   userProperty: 'payload'
// });

// login

userRoutes.post('/register', function(req, res){
    ctrlAuth.register(req, res)
});

// CRUD users routes ===========================================================

// Create / Register
userRoutes.post('/users', function (req, res) {
  var hash = bcrypt.hashSync(req.body.password);
  session
  .run( "CREATE (:User {firstname: {firstname}, lastname: {lastname}, role: {role}, email: {email}, password: {password}})",
  {firstname: req.body.firstname,lastname: req.body.lastname, email: req.body.email,role: req.body.role, password: hash })

  .then( function() {
    res.send('Account created');
    res.end();
    session.close();
    // driver.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });


});
// List all users in json
userRoutes.get('/users', function (req, res){
  session
  .run("MATCH (u:User) RETURN u")
  .then( function(result){
    res.json(result)
    session.close();
    driver.close();
  });
});

userRoutes.get('/users/:email', function(req,res){
  session
  .run("MATCH (u:User) WHERE u.email = {email} RETURN u", {username: req.params.email})
  .then( function(result){
    res.json(result)
    session.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });
});

// delete a user
userRoutes.delete('/users/:email/delete', function(req,res){
  session
  .run("MATCH (u:User { email: {email} })DETACH DELETE u", {email: req.params.email})
  .then( function(){
    res.send("user deleted")
    session.close();
    driver.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });
});

// edit users
userRoutes.put('/users/:email/edit', function(req, res){
  session.run("MATCH (n:User { email: {email} })SET n.firstname = {firstname},n.lastname = {lastname}, n.email = {new_email} RETURN n",
  {email: req.params.email, firstname:req.body.firstname,lastname:req.body.lastname, new_email: req.body.email})
  .then( function(result){
    res.json(result)
    session.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });
})

// authenticate w/ passport

module.exports = userRoutes
