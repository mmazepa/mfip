/*jshint node: true, esversion: 6 */

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var errorHandler = require("errorhandler");

var routes = require("./routes/index");
var users = require("./routes/users");

var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || "development";
var secret = process.env.SECRET || "$uper $ecret";

var flash = require('connect-flash');
var session = require('express-session');

var app = express();
var http = require("http").Server(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: secret }));

app.use(flash());

app.use("/", routes);
app.use("/users", users);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

if (env === 'development')
{
    app.use(logger('dev'));
    app.use(errorHandler());
}
else
{
    app.use(logger('short'));
}

app.use(function(err, req, res, next)
{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

http.listen(port, function()
{
    console.log("       ___ _     ");
    console.log(" _____|  _|_|___ ");
    console.log("|     |  _| | . |");
    console.log("|_|_|_|_| |_|  _|");
    console.log("            |_|  ");
    console.log("");
    console.log("[Serwer]:   Nasłuchuję na porcie " + port + ".");
});

module.exports = app;
