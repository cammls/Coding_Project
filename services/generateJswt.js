var path      = require('path')
var config    = require(path.join(__dirname, '../config/config.js'))

var generateJswt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    id: this.id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.secret);
}

exports.generateJswt = generateJswt
