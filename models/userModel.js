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

  var user_password = user_data.password
  session.run("MATCH (n:User) WHERE n.email = {email} RETURN n.password, ID(n), n.first_name, n.last_name, n.email, n.role", {email: user_data.email}).then(function(result) {
    if (result.records[0] === undefined) {
      callback("failure", "notoken")
      session.close()
      return
    }
    var stored_password = result.records[0]._fields[0]
    var password_comparison = bcrypt.compareSync(user_password, stored_password)
    if (password_comparison) {
      // SHOULD BE REFACTOED IN FUNCTION USED BY CURRENT MODULE (DONT KNOW YET HOW TO DO) ASK TANGUY
      var record = result.records[0]
      var id = record._fields[1].low
      var first_name = record._fields[2]
      console.log(first_name)
      var last_name = record._fields[3]
      var email = record._fields[4]
      var role = record._fields[5]
      var new_user_data = {id: id, first_name: first_name, last_name: last_name, email: email, role: role }
      var token = jwt.generateJswt(new_user_data)
      session.close()
      session.run("MATCH (n:User) WHERE ID(n) = {id} SET n.token = {token}", {id: neo4j.int(id), token: token}).then(function(result) {
        callback("success", token)
        session.close()
      }, function(reason) {
        callback("failure", "notoken")
        session.close()
      })
    } else {
      session.close()
      callback("failure", "notoken")
      session.close()
    }
  }, function(reason) {
      callback("failure", "notoken")
      session.close()
  })
}

var logoutUser = function(user_data, callback) {
  // CHECK IF THIS IS THE BEST SOLUTION TO FIND USER BY ID AFTER DECODING TOKEN
  // ONE OTHER SOLUTION BEEING CHECK IF THERE IS A USER THAT HAS THIS GIVEN TOKEN
  var token = user_data.token
  console.log(token)
  if (decoded = jwt.decodeJswt(token)) {
    session.run("MATCH (n:User) WHERE ID(n) = {id} REMOVE n.token", {id: neo4j.int(decoded.id)}).then(function(result) {
      callback("success", token)
      session.close()
    }, function(reason) {
      callback("failure", "notoken")
      session.close()
    })
  } else {
    callback("failure", "wrongtoken")
  }
}

 var tieUsertoCompany = function(user_id, company_id)
 {
   session.run("MATCH (u:User) WHERE ID(u)= {user_id} MATCH (c:Company) WHERE ID(c)={company_id} CREATE (u)-[r:BELONGS_TO]->(c) RETURN u,r,c", {user_id: neo4j.int(user_id), company_id: neo4j.int(company_id)})
   .then(function(result){
     console.log(result)
     // Completed!
     session.close();
   })
   .catch(function(error) {
     console.log(error);
   });
 }

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
 var editUser = function(id, data, callback){
  //  TODO GERER PASSWORD
   session
   .run("MATCH (u:User) WHERE ID(u)= {id} SET u.first_name = {first_name}, u.last_name= {last_name}, u.email = {email}, u.role={role} RETURN u"
   ,{id: neo4j.int(id),first_name: data.first_name, last_name: data.last_name, email: data.email, role: data.role} )
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
exports.editUser = editUser
