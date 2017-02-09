// modules =================================================

var express        = require('express')
var app            = express()
var bodyParser     = require('body-parser')
var bcrypt         = require('bcrypt-nodejs')
var path           = require('path')
var passport       = require('passport')
var config         = require('./config/config.js')
var passportConfig = require('./config/passport.js')
var algoliasearch  = require('algoliasearch')
var http           = require('http').Server(app);
var io             = require('socket.io')(http);

require('./services/socketService.js')(io);

// configure app to use bodyParser() ===========================================
// this will let us get the data from a POST ===================================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

// Routes ======================================================================
var userRoutes      = require('./routes/userRoutes.js')
var companyRoutes	= require('./routes/companyRoutes.js')
var apiQueriesRoute = require('./routes/apiQueriesRoute.js')
var relationsRoutes = require('./routes/relationsRoutes.js')

app.use('/api', companyRoutes)
app.use('/api', userRoutes)
app.use('/api', apiQueriesRoute)
app.use('/api', relationsRoutes)

//-- catch all route to initialize client app --
app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './public') })
});


// Socket IO (chat etc...)
io.on('connection', function(socket){
  console.log('a user connected');
});

// app.listen(8080);

http.listen(8080, function(){
  console.log('Party started at http://localhost:8080');
  console.log('Socket spider listening on anything:8080');
});
