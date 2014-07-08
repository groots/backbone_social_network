var express = require("express");
var http = require("http");
var app = express();
var mongoose = require('mongoose');
var handlebars = require("express3-handlebars");

app.set("port", process.env.PORT || 8000);
app.set("views", "./views");
app.engine('hbs', handlebars({extname:'hbs'}));
app.set("view engine", "hbs");
app.get("/", function(req, res){
	res.render("index", {
		title:"Base Social User Management System", 
		keywords:"Social User Management",
		description:"This is a base platform to be used in developmental projects that would require a user managment system"
	});
});

app.get('/account/authenticated', function(req, res){
	if (req.session.loggedIn){
		res.send(200);
	} else {
		res.send(401);
	}
});

http.createServer(app).listen(app.get("port"), function(){
	console.log("Express Server listening on port " + app.get("port"));
});