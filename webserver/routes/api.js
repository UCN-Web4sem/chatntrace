module.exports = function(io) {
	var express = require("express");
	var router = express.Router();
	const events = require("commonsettings").events;
	const bll = require("backend").bll;
	const jsonParser = require("body-parser").json();

	const lobbyFacade = bll.lobbyFacade;

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

	return router;
};
