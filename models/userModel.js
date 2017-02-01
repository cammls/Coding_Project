var passport       = require('passport')
var LocalStrategy  = require('passport-local').Strategy
var path           = require('path')
var jwt            = require('../services/generateJswt.js')
var driver         = require('./connect_db.js').connectdb()
var session        = driver.session()

var registerUser = function() {

}

var loginUser = function() {

}

var logoutUser = function() {

}

// var register = function(req, res) {
//   console.log(req.body)
//   var user = new User()
//
//   user.name = req.body.name;
//   user.email = req.body.email;
//
//   user.setPassword(req.body.password)
//   user.save(function(err) {
//     if (err) throw err
//     var token
//     token = user.generateJswt()
//     res.status(200)
//     res.json({
//       "token" : token
//     });
//   });
// };

// console.log(req.body)
// passport.use(new LocalStrategy(function(username, password, done) {
//     console.log("2");
//     session
//     .run("MATCH (u:User) WHERE u.username = {username} RETURN u", {username: req.body.username})
//     .then(function(result){
//       if (result == null){
//         return done(res.send("incorrect username"))
//         // return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!bcrypt.compareSync(req.body.password, hash)) // true)
//       {
//         // return done(null, false, { message: 'Incorrect password.' });
//         return done(res.send("incorrect username"))
//       }
//     });
//     return done(null, user);
//   }
// ))


// passport.authenticate('local', function(err, user, info) {
//   var token;
//
//   if (err) {
//     res.status(404).json(err)
//     return;
//   }
//   if (user) {
//     token = user.generateJswt();
//     res.status(200)
//     res.json({
//       "token" : token
//     })
//   } else {
//     res.status(401).json(info)
//   }
// })(req, res)

exports.registerUser = registerUser
exports.loginUser = loginUser
exports.logoutUser = logoutUser
