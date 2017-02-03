var driver    = require('./connect_db.js').connectdb();
var session   = driver.session();

var create = function(company_data,callback){
	session.run("CREATE(c:Company {name: {name}, description: {description}, industry: {industry}}) RETURN c",
		{name: company_data.name, description: company_data.description, industry:company_data.industry})
			.then(function(res){
				console.log(res.records[0]);
				callback(res.records.keys);
			},function(reason){
				console.log(reason)
			});
}

var list = function(){
	 session.run("MATCH (c:Company) RETURN c")
			.then(function(res){
				res.records.forEach(function(result){
					console.log(result.records);
				});
				session.close();
			});

}

var show = function(id,callback){
	 session.run("MATCH (n:Company) RETURN { Name: n.name , Description: n.description } as Startup ORDER BY n.id LIMIT 1")
			.then(function(res){
				console.log(JSON.stringify(res.records[0]));
				callback(JSON.stringify(res.records[0]));
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
