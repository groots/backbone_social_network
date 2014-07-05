var express = require("express");
var http = require("http");
var app = express();
var handlebars = require("express3-handlebars");

app.set("port", process.env.PORT || 8000);
app.set("views", "./views");
app.engine("hbs", handlebars);
app.set("view engine", "hbs");
app.get("/", function(res, res){
	res.render("index", {
		title:"Base Social User Management System", 
		keywords:"Social User Management",
		description:"This is a base platform to be used in developmental projects that would require a user managment system"
	});
});

http.createServer(app).listen(app.get("port"), function(){
	console.log("Express Server listening on port " + app.get("port"));
});