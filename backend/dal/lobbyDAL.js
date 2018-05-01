const model = require("../model");
const db = require("./firebase").child("lobbies/");

module.exports = {
	create(lobby, cb) {
		db.child(lobby.id).set(lobby, cb);
	},
	getAll(cb) {
		db.once("value").then(snapshot => {
			const val = snapshot.val();
			const lobbies = Object.keys(val).map(key => val[key]);
			cb(lobbies);
		});
	},
	addUserToLobby(lobby, user, cb) {
		db
			.child(lobby.id)
			.child("users")
			.set(user, cb);
	},
	removeUserFromLobby(lobby, user, cb) {
		console.log(user.id);
		db
			.child(lobby.id)
			.child("users")
			.set(null, cb);
	}
};
