var user          = require('../models/userModel.js')

var list = function(res){
  user.getUsers(function(response){
    res.json(response)
  })
}
var show = function(id, res){
  user.showUser(id, function(response){
    res.json(response)
  })
}
var delete_ = function(id, res){
  user.deleteUser(id, function(){
    res.send("user deleted")
  })
}
exports.list  = list
exports.show  = show
exports.delete_  = delete_