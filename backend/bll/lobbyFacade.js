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
	}
};
