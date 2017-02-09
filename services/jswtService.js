var path      = require('path')
var config    = require(path.join(__dirname, '../config/config.js'))
var jwt       = require('jsonwebtoken')

// SHOULD RETURN ERRORS IF TOKEN GENERATION / DECODING GOES WRONG

var generateJswt = function(user_data) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    id: user_data.id,
    email: user_data.email,
    first_name: user_data.first_name,
    last_name: user_data.last_name,
    role: user_data.role,
    picture: user_data.picture,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.secret);
}

var decodeJswt = function(token) {
  var decoded = jwt.verify(token, config.secret);
  return decoded
}

exports.generateJswt = generateJswt
exports.decodeJswt   = decodeJswt
