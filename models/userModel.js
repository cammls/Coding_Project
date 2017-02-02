var path           = require('path')
var jwt            = require('../services/jswtService.js')
var driver         = require('./connect_db.js').connectdb()
var neo4j          = require('neo4j-driver').v1
var session        = driver.session()
var bcrypt         = require('bcrypt-nodejs')

var registerUser = function(user_data, callback) {
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

var loginUser = function() {

}

var logoutUser = function() {

}

exports.registerUser = registerUser
exports.loginUser = loginUser
exports.logoutUser = logoutUser
