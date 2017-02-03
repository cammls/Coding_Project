var user          = require('../models/userModel.js')

var list = function(res){
  user.getUsers(function(response){
    res.json(response)
  })
}
var show = function(id, res){
  user.showUser(id, function(response){
    console.log(response)
    res.json(response)
  })
}
exports.list  = list
exports.show  = show
