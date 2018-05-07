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

const events = require("commonsettings").events;
const bll = require("backend").bll;
const userFacade = bll.userFacade;
const lobbyFacade = bll.lobbyFacade;
const chatMessageFacade = bll.chatMessageFacade;

io.on("connection", socket => {
	console.log("Got a connection");

	let state = {
		lobby: null,
		user: null
	};

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
			state.user = usr;
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
			console.log("The message is: ", content, "was displayed in the lobby: ");
		});
	});
	socket.on("disconnect", () => {
		if (state.lobby == null) {
			return;
		} else {
			lobbyFacade.removeUserFromLobby(state.lobby, state.user, err => {
				if (err) {
					return console.log(err);
				}
			});
		}
	});
});

module.exports = app;
