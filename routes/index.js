/*
 * GET home page.
 */
var express = require('express');
var app      = express();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

exports.index = function(req, res){
	res.sendfile('views/profile.html');
};

exports.search = function(req, res){
	res.sendfile('views/searchform.html');
};

exports.test = function(req,res) {
	res.sendfile('views/test.html');
};

exports.maps = function(req,res) {
	res.render("map");
};

//use google place api to get city location info
exports.results = function(req,res) {
	var options = {
     provider: 'google',

     // Optional depending on the providers
     httpAdapter: 'https', // Default
     apiKey: 'AIzaSyDP7TNhPwMtTB0BbdBz7A6doEkGoIw__v4', // for Mapquest, OpenCage, Google Premier
     formatter: null         // 'gpx', 'string', ...
   };

   var NodeGeocoder = require('node-geocoder');

   var geocoder = NodeGeocoder(options);
   var lat = "null";
   var long = "null";

   // Using callback
   geocoder.geocode('los angeles', function(err, geo_res, body) {
     // console.log(res);
     lat = geo_res[0].latitude; 
     long = geo_res[0].longitude; 
     // console.log("long", long);
     // console.log("lat", lat);
   //lat = res[0].latitude;
   //long = res[0].longitude;
   console.log("long", long);
   console.log("lat", lat);

	var location = lat+',' + long; // get location coordinates here 
	var radius = 2500; 
	var type = 'point_of_interest&establishment';
	
	var keyword = '';

	var gjson = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + "location=" + location + "&radius=" + radius + "&type=" + type + "&keyword=" + keyword + "&key=" + 'AIzaSyDP7TNhPwMtTB0BbdBz7A6doEkGoIw__v4';
	json = getJSON(gjson);





	//gjson = getJSON('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDP7TNhPwMtTB0BbdBz7A6doEkGoIw__v4');
	// console.log("json , " + json);

	var city = req.query.city;

	//sends data to the results.ejs



	res.render("results", { blob: json, usercity: city});
	// res.render("maps", { lat: json, lat: city});
	

	var googleMapsClient = require('@google/maps').createClient({
	  key: 'AIzaSyDP7TNhPwMtTB0BbdBz7A6doEkGoIw__v4'
	});
}); 

};

//sending data from server out 
	app.get('/results', function(req, res, next) {
	   res.json({ json});
	});


function getJSON(url) {
    var resp ;
	var xmlHttp ;

    resp  = '' ;
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)    {
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp ;
}


