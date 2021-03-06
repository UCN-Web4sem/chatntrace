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
			.child(user.id)
			.set(user, cb);
	},
	removeUserFromLobby(lobby, user, cb) {
		console.log(user.id);
		db
			.child(lobby.id)
			.child("users")
			.child(user.id)
			.remove(cb);
	},
	addMessageToLobby(lobby, message, cb) {
		db
			.child(lobby.id)
			.child("messages")
			.set(message, cb);
	},
	deleteLobby(lobby) {
		db
			.child(lobby.id)
			.remove()
			.then(function() {
				console.log("Success");
			})
			.catch(function(err) {
				// TODO err handlnig
				console.log(err);
			});
	}
};
