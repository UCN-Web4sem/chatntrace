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

let lobbyJoinedOrLeft = {};
let lobbyGameEvents = {};
lobbyFacade.getAll(lobbies => {
	lobbies.forEach(lobby => {
		lobbyJoinedOrLeft[lobby.id] = {
			joined: 0,
			left: 0
		};
		lobbyGameEvents[lobby.id] = [];
	});
});

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
	apiEvents.on("Create lobby", (socketID, lobby) => {
		if (state.socketID != socketID) return;
		lobbyJoinedOrLeft[lobby.id] = {
			joined: 0,
			left: 0
		};
		lobbyGameEvents[lobby.id] = [];
	});
	socket.on(events.JOIN_LOBBY, (lobby, user) => {
		joinLobby(lobby, user);
	});
	socket.on(events.LEAVE_LOBBY, (lobby, user) => {
		leaveLobby(lobby, user);
	});
	socket.on(events.SEND_MESSAGE, content => {
		chatMessageFacade.create(content, state.user, (err, message) => {
			if (err) {
				// TODO: err handling
				return console.log(err);
			}
			io.to(state.lobby.id).emit(events.NEW_MESSAGE, message); // TODO: maybe do socket.broadcast.to(state.lobby.id).emit(events.SEND_MESSAGE, message);
		});
	});
	socket.on("disconnect", () => {
		console.log("A user disconnected");
		if (state.lobby == null) {
			return;
		} else {
			leaveLobby(state.lobby, state.user);
		}
	});
	function joinLobby(lobby, user) {
		lobbyFacade.addUserToLobby(lobby, user, err => {
			if (err) {
				// tODO: err handling
				return console.log(err);
			}
			socket.join(lobby.id);
			lobbyJoinedOrLeft[lobby.id].joined += 1;
			state.lobby = lobby;
			socket.emit(events.GAME_EVENT_HISTORY, lobbyGameEvents[lobby.id]);
		});
	}

	function leaveLobby(lobby, user) {
		lobbyFacade.removeUserFromLobby(lobby, user, err => {
			if (err) {
				// TODO: err handling
				return console.log(err);
			}
			lobbyJoinedOrLeft[lobby.id].left += 1;
			socket.leave(lobby.id);
			lobby.lobby = null;
			if (
				lobbyJoinedOrLeft[lobby.id].joined > 0 &&
				lobbyJoinedOrLeft[lobby.id].joined == lobbyJoinedOrLeft[lobby.id].left
			) {
				lobbyFacade.deleteLobby(lobby);
				io.emit(events.DELETE_LOBBY, lobby);
				delete lobbyJoinedOrLeft[lobby.id];
				delete lobbyGameEvents[lobby.id];
			}
		});
	}

	// GAME EVENTS
	socket.on(events.GAME_ON_MOUSE_DOWN, point => {
		if (!state.lobby) return;
		lobbyGameEvents[state.lobby.id].push({
			event: events.GAME_ON_MOUSE_DOWN,
			args: [point]
		});
		socket.broadcast.to(state.lobby.id).emit(events.GAME_ON_MOUSE_DOWN, point);
	});
	socket.on(events.GAME_ON_MOUSE_MOVE, point => {
		if (!state.lobby) return;
		lobbyGameEvents[state.lobby.id].push({
			event: events.GAME_ON_MOUSE_MOVE,
			args: [point]
		});
		socket.broadcast.to(state.lobby.id).emit(events.GAME_ON_MOUSE_MOVE, point);
	});
	socket.on(events.GAME_ON_MOUSE_UP, () => {
		if (!state.lobby) return;
		lobbyGameEvents[state.lobby.id].push({
			event: events.GAME_ON_MOUSE_UP,
			args: []
		});
		socket.broadcast.to(state.lobby.id).emit(events.GAME_ON_MOUSE_UP);
	});
});

module.exports = app;
