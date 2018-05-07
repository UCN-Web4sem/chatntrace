var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const EventEmitter = require("events");

var app = express();
var io = require("socket.io")();
// TODO: REPORT
app.io = io; // see https://stackoverflow.com/a/28325154

class ApiEventEmitter extends EventEmitter {}
const apiEvents = new ApiEventEmitter();

var indexRouter = require("./routes/index")(io);
var apiRouter = require("./routes/api")(io, apiEvents);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

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

const events = require("commonsettings").events;
const bll = require("backend").bll;
const userFacade = bll.userFacade;
const lobbyFacade = bll.lobbyFacade;
const chatMessageFacade = bll.chatMessageFacade;

io.on("connection", socket => {
	console.log("Got a connection");

	let state = {
		socketID: null,
		lobby: null,
		user: null
	};

	socket.on(events.INITIAL_ID, id => (state.socketID = id));

	apiEvents.on("create user", (socketID, user) => {
		if (state.socketID != socketID) return;
		state.user = user;
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
			socket.join(lobby.id);
			state.lobby = lobby;
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
			socket.leave(lobby.id);
			state.lobby = null;
		});
	});
	socket.on(events.SEND_MESSAGE, content => {
		chatMessageFacade.create(content, state.user, (err, message) => {
			if (err) {
				// TODO: err handling
				return console.log(err);
			}
			console.log("EMITTING MSG TO", state.lobby);
			io.to(state.lobby.id).emit(events.NEW_MESSAGE, message); // TODO: maybe do socket.broadcast.to(state.lobby.id).emit(events.SEND_MESSAGE, message);
			console.log(
				"The message is: ",
				content,
				"was displayed in the lobby: ",
				state.lobby
			);
		});
	});
});

module.exports = app;
