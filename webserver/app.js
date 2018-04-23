var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
var io = require("socket.io")();
// TODO: REPORT
app.io = io; // see https://stackoverflow.com/a/28325154

var indexRouter = require("./routes/index")(io);
var usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// TODO move the following into its own file/module
const events = require("commonsettings").events;
const bll = require("");
io.on("connection", socket => {
	console.log("Got a connection");
	socket.on(events.CREATE_USER, username => {
		console.log("create user", username);
	});
});

module.exports = app;
