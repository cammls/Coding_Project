var path    	 = require('path');
var user    	 = require('../models/companyModel.js');
var companyModel = require(path.join(__dirname,'../models/companyModel.js'));

var create = function(company_data, res){
	companyModel.create(company_data, function(response){
		res.json(response)
	});
}

var list = function(res){
	companyModel.list(res);

}

var show = function(company_data,res){
	companyModel.show(company_data, function(response){
		console.log(response);
		res.json(response);
	})
}

var edit = function(id,new_data,res){
	companyModel.edit(id,new_data,res);
}


exports.list = list
exports.create = create
exports.show = show
exports.edit = edit
