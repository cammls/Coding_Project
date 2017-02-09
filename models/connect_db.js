var config    = require('../config/config.js')
var neo4j     = require('neo4j-driver').v1

var connectdb = function() {
     return neo4j.driver("bolt://hobby-lakdnobeoeaggbkedbifhpol.dbs.graphenedb.com:24786", neo4j.auth.basic("neo4j", config.neo4jpassword))
   //return neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "camille"));
}

exports.connectdb = connectdb
