var user          = require('../models/userModel.js');
var algoliasearch = require('algoliasearch');
var client        = algoliasearch('7G7ED6C2ZX', '4901abfb3e83b3d3b6c52cdbd1677f9b');
var index         = client.initIndex('user');

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
var edit = function(id, data, res){
  // TODO checks !! purpose of a controller
  user.editUser(id, data, function(response){
    index.saveObject({
      firstname: data.first_name,
      lastname: data.last_name,
      email: data.email,
      role: data.role
    }, function(err, content) {
      console.log(content);
    });
    res.json(response)
  })
}
var delete_ = function(id, res){
  index.deleteObject(id, function(err) {
    if (!err) {
      console.log('success');
      }
  });
  user.deleteUser(id, function(){
    res.send("user deleted")
  })
}
exports.list  = list
exports.show  = show
exports.delete_  = delete_
exports.edit  = edit
