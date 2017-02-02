var path    	 = require('path');
var user    	 = require('../models/companyModel.js');
var companyModel = require(path.join(__dirname,'../models/companyModel.js'));


var create = function(company_data){
	companyModel.create(company_data);
}

var list = function(){

	res.end()
}
//Verifications
//Appel au model

var show
//Verifications
//Appel au model

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
