module.exports = function(io) {
	var express = require("express");
	var router = express.Router();
	const bll = require("backend").bll;

	const lobbyFacade = bll.lobbyFacade;

	router
		.route("/lobby")
		.get(function(req, res, next) {
			lobbyFacade.getAll(lobbies => {
				res.json(lobbies);
			});
		})
		.post(function(req, res, next) {
			res.json({
				error: "Not yet implemented"
			});
		});

	return router;
};
