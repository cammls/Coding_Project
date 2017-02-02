var driver    = require('./connect_db.js').connectdb();
var session   = driver.session();

var create = function create(params,res){
	session.run("CREATE(:Company {name: {name}, description: {description}, industry: {industry}})",
		{name: params.name, description: params.description, industry:params.industry})
			.then( function(){
				console.log("OK BRAH!")
				//res.send("Company created successfully");
				//res.end();
				session.close();
			})
			.catch(function(error){
				console.log("niet");
				res.send(error);
				console.log(error);
			});
}

var list = function list(){
	 session.run("MATCH (c:Company) RETURN c")
			.then( function(result){
				res.json(result)
				session.close();
			}) 
}

var show = function show(id){
	
}

exports.create = create;
exports.list = list;
