var user          = require('../models/userModel.js')

var list = function(res){
  user.getUsers(function(response){
    res.json(response)
  })
}
exports.list  = list
