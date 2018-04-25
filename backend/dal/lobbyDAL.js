const model = require("../model");
const db = require("./firebase").child("lobbies/");

module.exports = {
	create(lobby, cb) {
		db.child(lobby.id).set(lobby, cb);
	}
};
