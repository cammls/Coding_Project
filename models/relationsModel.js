var path           = require('path')
var driver         = require('./connect_db.js').connectdb()
var neo4j          = require('neo4j-driver').v1
var session        = driver.session()


var tieUsertoCompany = function(user_id, company_id)
{
  session.run("MATCH (u:User) WHERE ID(u)= {user_id} MATCH (c:Company) WHERE ID(c)={company_id} CREATE (u)-[r:BELONGS_TO]->(c) RETURN u,r,c"
  , {user_id: neo4j.int(user_id), company_id: neo4j.int(company_id)})
  .then(function(result){
    // Completed!
    session.close();
  })
  .catch(function(error) {
    console.log(error);
  });
}
var follow = function(user_id, id){
  session.run("MATCH (a) WHERE ID(a)= {user_id} MATCH (b) WHERE ID(b)={id} CREATE (a)-[r:FOLLOWS]->(b) RETURN a,r,b"
  ,{user_id: neo4j.int(user_id), id: neo4j.int(id)})
  .then(function(result){
    // Completed!
    session.close();
  })
  .catch(function(error) {
    console.log(error);
  });
}
var following = function(id, callback){
  session.run("MATCH (u:User)-[r:FOLLOWS]->(x) WHERE ID(u) ={id} RETURN x", {id: neo4j.int(id)})
  .then(function(result){
    callback(result.records)
    // Completed!
    session.close();
  })
  .catch(function(error) {
    console.log(error);
  });
}
exports.tieUsertoCompany = tieUsertoCompany
exports.follow = follow
exports.following = following
