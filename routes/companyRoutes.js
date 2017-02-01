var express       = require('express')
var companyRoutes    = express.Router()
var path          = require('path')
var config        = require(path.join(__dirname, '../config/config.js'))

//CRUD Company

// Create
companyRoutes.post('/company', function (req, res) {
  var hash = bcrypt.hashSync(req.body.password);
  session
  .run( "CREATE (:Company {name: {name}, description: {description}, industry: {industry}})",
  {name: req.body.name, description: req.body.description,industry: req.body.industry})

  .then( function() {
    res.send('Company created');
    res.end();
    session.close();

  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });

  // List
  userRoutes.get('/companies', function (req, res){
  session
  .run("MATCH (c:Company) RETURN c")
  .then( function(result){
    res.json(result)
    session.close();
    driver.close();
  });
});

  // Show one
userRoutes.get('/company/:name', function(req,res){
  session
  .run("MATCH (c:Company) WHERE c.name = {name} RETURN c", {name: req.params.name})
  .then( function(result){
    res.json(result)
    session.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });
});

 // Edit
 userRoutes.put('/company/:name/edit', function(req, res){
  session.run("MATCH (c:Company { name: {name} })SET n.name = {name},n.description = {description}, n.industry = {industry} RETURN n",
  {name: req.params.name, description:req.body.description,industry:req.body.industry})
  .then( function(result){
    res.json(result)
    session.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });
})

 //Delete
 // delete a user
userRoutes.delete('/users/:email/delete', function(req,res){
  session
  .run("MATCH (c:Company { name: {name} })DETACH DELETE c", {email: req.params.email})
  .then( function(){
    res.send("company deleted")
    session.close();
    driver.close();
  })
  .catch(function(error) {
    res.send(error);
    console.log(error);
  });
});