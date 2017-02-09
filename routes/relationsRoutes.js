var express       = require('express')
var relationsRoutes    = express.Router()
var path          = require('path')
var relModel          = require(path.join(__dirname, '../models/relationsModel.js'))

relationsRoutes.post('/belongs', function(req,res){
  var user_id = req.body.user_id
  var comp_id = req.body.comp_id
  relModel.tieUsertoCompany(user_id, comp_id)
})
relationsRoutes.post('/follow', function(req,res){
  var user_id = req.body.user_id
  var id = req.body.id
  relModel.follow(user_id,id)
})

relationsRoutes.get('/following/:id', function(req, res){
  var id = req.params.id
  console.log(id)
  relModel.following(id, function(response){
    // console.log(response)
    res.json(response)
  })
})
module.exports = relationsRoutes
