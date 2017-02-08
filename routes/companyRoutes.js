var express       = require('express')
var companyRoutes = express.Router()
var path          = require('path')
var ctrlCompany   = require(path.join(__dirname, '../controllers/companyController.js'))

//CRUD Company

// Create
companyRoutes.post('/company/new', function (req, res) {
  var company_data = req.body;
  ctrlCompany.create(company_data,res);
  });

// List
companyRoutes.get('/companies', function (req, res){
  ctrlCompany.list(res);
});

// Show one
companyRoutes.get('/company/:id', function(req,res){
  var company_id = req.params.id;
  ctrlCompany.show(company_id,res);

});

// Edit
companyRoutes.put('/company/:id/edit', function(req, res){
  var company_id = req.params.id;
  var new_data = req.body;
  ctrlCompany.edit(company_id,new_data,res);
})


module.exports = companyRoutes
