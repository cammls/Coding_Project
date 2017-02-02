// var passport       = require('passport')
// var LocalStrategy  = require('passport-local').Strategy
var path           = require('path')
var jwt            = require('../services/jswtService.js')
var driver         = require('./connect_db.js').connectdb()
var session        = driver.session()
var bcrypt         = require('bcrypt-nodejs')

var registerUser = function(user_data, callback) {
  var hashed_pass = bcrypt.hashSync(user_data.password)
  // var token = jwt.generateJswt(user_data)
  console.log(user_data);
  session.run("CREATE (p:User {first_name: {first_name}, last_name: {last_name}, role: {role}, email: {email}, password: {password}}) RETURN p",
              {first_name: user_data.first_name,last_name: user_data.last_name, email: user_data.email,role: user_data.role, password: hashed_pass })
         .then(function(result) {
              console.log(result.records[0])
              callback(result.records.keys)
          }, function(reason) {
            console.log('hello')
              console.log(reason)
          });

}

var loginUser = function() {

}

var logoutUser = function() {

}

// ===============================================================================
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
// ===============================================================================
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
// ===============================================================================
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
// ===============================================================================
// var hash = bcrypt.hashSync(req.body.password);
// session
// .run( "CREATE (:User {firstname: {firstname}, lastname: {lastname}, role: {role}, email: {email}, password: {password}})",
// {firstname: req.body.firstname,lastname: req.body.lastname, email: req.body.email,role: req.body.role, password: hash })
//
// .then( function() {
//   res.send('Account created');
//   res.end();
//   session.close();
//   // driver.close();
// })
// .catch(function(error) {
//   res.send(error);
//   console.log(error);
// });
// ===============================================================================
// session
// .run("MATCH (u:User) RETURN u")
// .then( function(result){
//   res.json(result)
//   session.close();
//   driver.close();
// });
//   session
// ===============================================================================
// .run("MATCH (u:User) WHERE u.email = {email} RETURN u", {username: req.params.email})
// .then( function(result){
//   res.json(result)
//   session.close();
// })
// .catch(function(error) {
//   res.send(error);
//   console.log(error);
// });
// ================================================================================
// session
// .run("MATCH (u:User { email: {email} })DETACH DELETE u", {email: req.params.email})
// .then( function(){
//   res.send("user deleted")
//   session.close();
//   driver.close();
// })
// .catch(function(error) {
//   res.send(error);
//   console.log(error);
// });
// ================================================================================
// session.run("MATCH (n:User { email: {email} })SET n.firstname = {firstname},n.lastname = {lastname}, n.email = {new_email} RETURN n",
// {email: req.params.email, firstname:req.body.firstname,lastname:req.body.lastname, new_email: req.body.email})
// .then( function(result){
//   res.json(result)
//   session.close();
// })
// .catch(function(error) {
//   res.send(error);
//   console.log(error);
// });

exports.registerUser = registerUser
exports.loginUser = loginUser
exports.logoutUser = logoutUser
