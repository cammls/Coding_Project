var path    	 = require('path');
var user    	 = require('../models/companyModel.js');
var companyModel = require(path.join(__dirname,'../models/companyModel.js'));

var create = function(company_data){
	companyModel.create(company_data);
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

var edit = function(company_data){
	companyModel.edit(company_data,res);
}

var destroy = function(company_data){
	companyModel.destroy(company_data,res);
}

exports.list = list
exports.create = create
exports.show = show
exports.edit = edit
exports.destroy = destroy
