module.exports = function(io, apiEvents) {
	var express = require("express");
	var router = express.Router();
	const events = require("commonsettings").events;
	const bll = require("backend").bll;
	const jsonParser = require("body-parser").json();

	const lobbyFacade = bll.lobbyFacade;
	const userFacade = bll.userFacade;

	router
		.route("/lobby")
		.get(function(req, res, next) {
			lobbyFacade.getAll(lobbies => {
				res.json(lobbies);
			});
		})
		.post(jsonParser, function(req, res, next) {
			const lobbyname = req.body.name;
			lobbyFacade.create(lobbyname, (err, lob) => {
				if (err) {
					return console.log(err);
				}
				io.emit(events.NEW_LOBBY, lob); // TODO: should use socket.broadcast.emit and handle update in client
				console.log("the lobby : ", lob, " was created in the db");
				res.json(lob);
			});
		});

	router
		.route("/user")
		.get(function(req, res, next) {
			res.json({ error: "not yet implemented" });
		})
		.post(jsonParser, function(req, res, next) {
			const username = req.body.name;
			const socketID = req.body.socketID;
			userFacade.create(username, (err, usr) => {
				if (err) {
					// TODO: err handling
					return console.log(err);
				}
				io.emit(events.NEW_USER, usr); // TODO: should use socket.broadcast.emit and handle update in client
				apiEvents.emit("create user", socketID, usr);
				console.log("the user", usr, "was saved in the db");
				res.json(usr);
			});
		});

	return router;
};
