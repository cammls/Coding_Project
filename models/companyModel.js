var driver    = require('./connect_db.js').connectdb();
var session   = driver.session();

var create = function(company_data,callback){
	session.run("CREATE(c:Company {name: {name}, description: {description}, industry: {industry}}) RETURN c",
		{name: company_data.name, description: company_data.description, industry:company_data.industry})
			.then(function(res){
				console.log("Success");
				console.log(res.records[0]);
				callback(res.records.keys);
			},function(reason){
				console.log(reason)
			});
}

var list = function(){
	 session.run("MATCH (c:Company) RETURN c")
			.then(function(res){
				res.records.forEach(function(record){
					console.log(record);
				});
				session.close();
			});

}

var show = function(id){
	console.log("i'm in");
	session.run("MATCH (c:Company) WHERE c.id ")
}


exports.create = create;
exports.list = list;
exports.show = show;
