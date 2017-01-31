var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var bcrypt         = require('bcrypt-nodejs');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "camille"));
var session = driver.session();
//login !!

app.post('/api/login', function(req, res){
  console.log("1");
  passport.use(new LocalStrategy(function(username, password, done) {
    console.log("2");
    session
    .run("MATCH (u:User) WHERE u.username = {username} RETURN u", {username: req.body.username})
    .then(function(result){
      if (result == null){
        return done(res.send("incorrect username"))
        // return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(req.body.password, hash)) // true)
      {
        // return done(null, false, { message: 'Incorrect password.' });
        return done(res.send("incorrect username"))
      }
    });
    return done(null, user);
  }
))
});
// CRUD users routes
//Create / Register
app.post('/api/users', function (req, res) {
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
app.get('/api/users', function (req, res){
  session
   .run("MATCH (u:User) RETURN u")
  .then( function(result){
    res.json(result)
    session.close();
    driver.close();
  });
});
app.get('/api/users/:email', function(req,res){
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
app.delete('/api/users/:email/delete', function(req,res){
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
// EDIT USER
app.put('/api/users/:email/edit', function(req, res){
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
// AUTHENTICATION WITH passport

app.listen(8080);
console.log('Server listenning on port 8080');
