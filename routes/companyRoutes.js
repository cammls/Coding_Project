var express       = require('express')
var companyRoutes = express.Router()
var path          = require('path')

var ctrlCompany   = require(path.join(__dirname, '../controllers/companyController.js'))

//CRUD Company

// Create
companyRoutes.post('/company/new', function (req, res) {
  var company_data = req.body;
  ctrlCompany.create(company_data);
  });

// List
companyRoutes.get('/companies', function (req, res){
  ctrlCompany.list();
});

// Show one - WILL NOT WORK YET
companyRoutes.get('/company/:id', function(req,res){
  company_id = req.params.id;
  ctrlCompany.show(company_id,res);
});

// Edit
companyRoutes.put('/company/:id/edit', function(req, res){
  company_id = req.body.id;
  ctrlCompany.edit(company_id);
})

//Delete
companyRoutes.delete('/company/:id/delete', function(req,res){
  company_to_delete = req.body.id;
  ctrlCompany.destroy(company_to_delete);
});

module.exports = companyRoutes