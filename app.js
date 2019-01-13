
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app      = express();

var jquery = require("jquery");


//for login page
var passport = require('passport');
var flash    = require('connect-flash');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var errorHandler = require('errorhandler');

var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://traveller-43dad.firebaseio.com"
});

var all_users = null;
var db = firebase.database();
var ref = db.ref("user");
ref.once("value", function(snapshot) {
 // console.log("user is:", snapshot.val());
  all_users = snapshot.val();
 // var users = JSON.parse(all_users);
  console.log("allusers:  ", all_users.hanna);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)


//load routes
//sample routes
var login = require('./routes/login');

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./passport')(passport); // pass passport for configuration

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', login.home);
app.get('/home', routes.index);
app.get('/login', login.login);
app.get('/signup', login.signup);
app.get('/searchform', routes.search);
app.get('/test', routes.test);
app.get('/searchresults', routes.results);
app.get('/maps',routes.maps);


// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/searchform', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/searchform', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/index.html', function(req, res) {
        res.sendFile(__dirname + "/" + "index.html");
    });


var NodeGeocoder = require('node-geocoder');

   

  app.get('/user', function(req, res){
        response = {
            first_name : req.query.first_name,
            last_name : req.query.last_name,
            gender: req.query.gender
            };
        
        console.log(response);
        
        res.end(JSON.stringify(response));
    });




var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

