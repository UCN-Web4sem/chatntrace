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

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

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

// TODO: move the following into its own file/module
let lobbies = [];

const events = require("commonsettings").events;
const bll = require("backend").bll;
const userFacade = bll.userFacade;
const lobbyFacade = bll.lobbyFacade;

io.on("connection", socket => {
	console.log("Got a connection");

	// Give the socket a list of all the lobbies
	lobbyFacade.getAll(lobbies => {
		socket.emit(events.ALL_LOBBIES, lobbies);
	});

	socket.on(events.CREATE_USER, username => {
		userFacade.create(username, (err, usr) => {
			if (err) {
				// TODO: err handling
				return console.log(err);
			}
			io.emit(events.NEW_USER, usr); // TODO: should use socket.broadcast.emit and handle update in client
			lobbyFacade.getAll(lobbies => {
				socket.emit(events.ALL_LOBBIES, lobbies);
			});
			console.log("the user", usr, "was saved in the db");
		});
	});
	socket.on(events.CREATE_LOBBY, lobbyname => {
		lobbyFacade.create(lobbyname, (err, lob) => {
			if (err) {
				// TODO: err handling
				return console.log(err);
			}
			io.emit(events.NEW_LOBBY, lob); // TODO: should use socket.broadcast.emit and handle update in client
			console.log("the lobby : ", lob, " was created in the db");
		});
	});
	socket.on(events.JOIN_LOBBY, (lobby, user) => {
		lobbyFacade.addUserToLobby(lobby, user, err => {
			if (err) {
				// tODO: err handling
				return console.log(err);
			}
			console.log(
				"the user : ",
				user,
				"was added to the ",
				lobby,
				"in the db now"
			);
		});
	});
	socket.on(events.LEAVE_LOBBY, (lobby, user) => {
		lobbyFacade.removeUserFromLobby(lobby, user, err => {
			if (err) {
				// TODO: err handling
				return console.log(err);
			}
			console.log(
				"the user : ",
				user,
				"was removed from the ",
				lobby,
				"in the db"
			);
		});
	});
});

module.exports = app;
