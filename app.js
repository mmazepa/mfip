/*jshint node: true, esversion: 6 */

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const errorHandler = require("errorhandler");

const routes = require("./routes/index");
const users = require("./routes/users");

let port = process.env.PORT || 3000;
let env = process.env.NODE_ENV || "development";
let secret = process.env.SECRET || "$uper $ecret";

const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const http = require("http").Server(app);

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

// plik do testowania połączenia z bazą
app.use("/test", require("./routes/test"));

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
