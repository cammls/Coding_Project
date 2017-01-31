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
  // .run("MATCH (u:User) RETURN u") les deux marchent
  .run("MATCH (u:User) RETURN u.username, u.email")
  .then( function(result){
    res.json(result)
    session.close();
    driver.close();
  });
});
app.get('/api/users/:username', function(req,res){
  session
  .run("MATCH (u:User) WHERE u.username = {username} RETURN u", {username: req.params.username})
  .then( function(result){
    res.json(result)
    session.close();
    driver.close();
  });
});
// delete a user
app.delete('/api/users/:username/delete', function(req,res){
  session
  .run("MATCH (u:User { username: {username} })DETACH DELETE u", {username: req.params.username})
  .then( function(){
    res.send("user deleted")
    session.close();
    driver.close();
  });
});
// EDIT USER
app.put('/api/users/:username/edit', function(req, res){
  session.run("MATCH (n:User { username: 'foo' })SET n.username = {username}, n.email = {email} RETURN n",
  {username:req.body.username, email: req.body.email})
  .then( function(result){
    res.json(result)
    session.close();
    driver.close();

  })
})
// AUTHENTICATION WITH passport

app.listen(8080);
console.log('Server listenning on port 8080');
