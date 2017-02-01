var passport  = require('passport')
var path      = require('path')
var jwt       = require('../services/generateJswt.js')
var user      = require('../models/userModel.js')

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

var register = function(req, res) {
  console.log(req)
  passport.use(new LocalStrategy(function(username, password, done) {
      console.log("2");
      session
      .run("MATCH (u:User) WHERE u.username = {username} RETURN u", {username: req.body.username})
      .then(function(result){
        if (result == null){
          return done(res.send("incorrect username"))
          // return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(req.body.password, hash)) // true)
        {
          // return done(null, false, { message: 'Incorrect password.' });
          return done(res.send("incorrect username"))
        }
      });
      return done(null, user);
    }
  ))
}

var login = function(req, res) {

  passport.authenticate('local', function(err, user, info) {
    var token;

    if (err) {
      res.status(404).json(err)
      return;
    }
    if (user) {
      token = user.generateJswt();
      res.status(200)
      res.json({
        "token" : token
      })
    } else {
      res.status(401).json(info)
    }
  })(req, res)
}

exports.register = register
exports.login    = login
