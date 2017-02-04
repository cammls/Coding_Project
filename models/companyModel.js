var driver    = require('./connect_db.js').connectdb();
var session   = driver.session();
var neo4j     = require('neo4j-driver').v1

var create = function(company_data,callback){
	session.run("CREATE(c:Company {name: {name}, description: {description}, industry: {industry}}) RETURN c",
		{name: company_data.name, description: company_data.description, industry:company_data.industry})
			.then(function(result){
				console.log(result.records[0]);
				callback(result.records.keys);
			},function(reason){
				console.log(reason)
			});
}

var list = function(callback){
	 session.run("MATCH (c:Company) RETURN c")
			.then(function(result){
				console.log(callback);
				callback.send(result);
				//console.log(JSON.stringify(result.records));
    			//callback(JSON.stringify(result.records));
  			})
  			.catch(function(error) {
    			console.log(error);
  			});
 }

var show = function(id,callback){
	 session.run("MATCH (n:Company) WHERE ID(n)= {id} RETURN n", {id: neo4j.int(id)})
			.then(function(result){
				console.log(result.records[0]);
				callback(JSON.stringify(result.records[0]));
			})
  			.catch(function(error) {
    			console.log(error);
			});
}

var edit = function(id){
	console.log("changeme");
}

var destroy = function(id){
	console.log("killme");
}


exports.create = create;
exports.list = list;
exports.show = show;
exports.edit = edit;
exports.destroy = destroy;
