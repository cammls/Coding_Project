var path           = require('path')
var jwt            = require('../services/jswtService.js')
var driver         = require('./connect_db.js').connectdb()
var neo4j          = require('neo4j-driver').v1
var session        = driver.session()
var bcrypt         = require('bcrypt-nodejs')

var registerUser = function(user_data, callback) {
  // This is not a very secured way, should be hashed and salted
  var hashed_pass = bcrypt.hashSync(user_data.password)
  session.run("CREATE (p:User {first_name: {first_name}, last_name: {last_name}, role: {role}, email: {email}, password: {password} }) RETURN ID(p), p.first_name, p.last_name, p.email, p.role",
              {first_name: user_data.first_name,last_name: user_data.last_name, email: user_data.email,role: user_data.role, password: hashed_pass })
         .then(function(result) {
              var record = result.records[0]
              var id = record._fields[0].low
              var first_name = record._fields[1]
              var last_name = record._fields[2]
              var email = record._fields[3]
              var role = record._fields[4]
              var user_data = {id: id, first_name: first_name, last_name: last_name, email: email, role: role }
              var token = jwt.generateJswt(user_data)
              session.close()
              session.run("MATCH (n:User) WHERE ID(n) = {id} SET n.token = {token}", {id: neo4j.int(id), token: token}).then(function(result) {
                callback("success", token)
                session.close()
              }, function(reason) {
                callback("failure", "notoken")
                session.close()
              })
          }, function(reason) {
              callback("failure", "notoken")
              session.close()
          });
}

var loginUser = function(user_data, callback) {
  // Find user corresponding to email
  session.run("MATCH (n:User) WHERE n.email = {email} RETURN n.password", {email: user_data.email})
  .then(function(result) {
    var stored_password = result.records[0]._fields[0]
    if (bcrypt.compareSync(user_data.password, stored_password)) {
      console.log("TODO NICE IF TRUE SHOULD BE LOGGED IN !!!")
    }
  }, function(reason) {
      console.log(reason)
  })
  // Find its password
  // Encrypt the password it entered
  // Compare hashed passwords
    // If matches then generate token send token and "success" to controller
    // Else return it failed miserably
}

var logoutUser = function(token, callback) {

}
//  TO CONTINUE LATER
 // var tieUsertoCompany = function(user_id, company_id)
 // {
 //   session.run("MATCH (u:User) WHERE ID(u)= {user_id}, (c:Company) WHERE ID(c) = {company_id} CREATE (u)-[:BELONGS_TO]->(c) RETURN u,c", {user_id: neo4j.int(user_id), company_id: neo4j.int(company_id)})
 //   .then(function(result){
 //     result.records.forEach(function(record) {
 //       console.log(record._fields);
 //     });
 //     // Completed!
 //     session.close();
 //   })
 //   .catch(function(error) {
 //     console.log(error);
 //   });
 // }
 var getUsers = function(callback){
   session
   .run("MATCH (u:User) RETURN u")
   .then(function(result){
    // Completed!
    callback(result.records)
    session.close();

  })
  .catch(function(error) {
    console.log(error);
  });
 }
 var showUser = function(id, callback){
   session
   .run("MATCH (u:User) WHERE ID(u) ={id} RETURN u",{id:  neo4j.int(id)})
   .then(function(result){
    // Completed!
    callback(result.records)
    session.close();
  })
  .catch(function(error) {
    console.log(error);
  });
 }
 var deleteUser = function(id, callback){
   session
   .run("MATCH (u:User) WHERE ID(u) ={id} DELETE u",{id:  neo4j.int(id)})
   .then(function(){
    // Completed!
    callback()
    session.close();
  })
  .catch(function(error) {
    console.log(error);
  });
 }
exports.registerUser = registerUser
exports.loginUser = loginUser
exports.logoutUser = logoutUser
exports.getUsers = getUsers
exports.showUser = showUser
exports.deleteUser = deleteUser
