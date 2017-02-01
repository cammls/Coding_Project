var config    = require('../config/config.js')
var neo4j     = require('neo4j-driver').v1

var connectdb = function() {
  return neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", config.neo4jpassword))
}

exports.connectdb = connectdb