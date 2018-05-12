const model = require("../model");
const uuidv4 = require("uuid/v4");
const DAL = require("../dal");

module.exports = {
	create: (name, cb) => {
		name.trim();
		if (name == "") {
			// TODO:
			console.warn("an empty name. This is not allowed");
			return;
		}
		let lob = new model.Lobby(uuidv4(), name);
		DAL.lobby.create(lob, (err, lobby) => {
			cb(err, lob);
		});
	},

	getAll(cb) {
		DAL.lobby.getAll(cb);
	},

	addUserToLobby(lobby, user, cb) {
		if (!lobby) return cb(new Error("Must provide a lobby"));
		if (!user) return cb(new Error("Must provide a user"));
		DAL.lobby.addUserToLobby(lobby, user, cb);
	},

	removeUserFromLobby(lobby, user, cb) {
		if (!lobby) return cb(new Error("Must provide a lobby"));
		if (!user) return cb(new Error("Must provide a user"));
		DAL.lobby.removeUserFromLobby(lobby, user, cb);
	},

	addMessageToLobby(lobby, message, cb) {
		if (!lobby) return cb(new Error("Must provide a lobby"));
		if (!message) return cb(new Error("Must provide a message"));
		DAL.lobby.addMessageToLobby(lobby, message, cb);
	},
	deleteLobby(lobby) {
		DAL.lobby.deleteLobby(lobby);
	}
};
