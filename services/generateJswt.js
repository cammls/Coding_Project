var path      = require('path')
var config    = require(path.join(__dirname, '../config/config.js'))
var jwt       = require('jsonwebtoken')


var generateJswt = function(id, email, first_name, last_name, role) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    id: id,
    email: email,
    first_name: first_name,
    last_name: last_name,
    role: role,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.secret);
}

exports.generateJswt = generateJswt
