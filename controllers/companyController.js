var path    	 = require('path');
var user    	 = require('../models/companyModel.js');
var companyModel = require(path.join(__dirname,'../models/companyModel.js'));
var algoliasearch = require('algoliasearch');
var client        = algoliasearch('7G7ED6C2ZX', '4901abfb3e83b3d3b6c52cdbd1677f9b');
var index         = client.initIndex('company');

var create = function(company_data, res){
	companyModel.create(company_data, function(response){
		res.json(response)
	});
	//adding company to algolia
      index.addObject({
        name: company_data._name,
        description: company_data.description,
        industry: company_data.industry
      }, function(err, content) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(content);
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

	index.saveObject({
        name: new_data.name,
        description: new_data.description,
        industry: new_data.industry,
        objectID: id
      }, function(err, content) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(content);
      });
}


exports.list = list
exports.create = create
exports.show = show
exports.edit = edit
