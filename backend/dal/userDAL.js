const model = require("../model");
const db = require("./firebase").child("users/");

module.exports = {
	create(user) {
		db.child(user.id).set(user);
	}
};
