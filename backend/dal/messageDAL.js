const model = require("../model");
const db = require("./firebase").child("messages/");

module.exports = {
	create(message, cb) {
		console.log("inserting message", message, "with id", message.id);
		db.child(message.id).set(message, cb);
	},
	getAll(cb) {
		db.once("value").then(snapshot => {
			const val = snapshot.val();
			const messages = Object.keys(val).map(key => val[key]);
			cb(messages);
		});
	}
};
