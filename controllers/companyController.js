var path    	 = require('path');
var user    	 = require('../models/companyModel.js');
var companyModel = require(path.join(__dirname,'../models/companyModel.js'));


var create = function(company_data){
	companyModel.create(company_data);
}

var list = function(){
	companyModel.list();
}
//Verifications
//Appel au model

var show = function(company_data){
	companyModel.show(company_data);
}

var edit
//Verifications
//Appel au model

var destroy
//Verifications
//Appel au model

exports.list = list
exports.create = create
exports.show = show
exports.edit = edit
exports.destroy = destroy
