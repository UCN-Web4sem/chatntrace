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
		let usr = new model.User(uuidv4(), name);
		DAL.user.create(usr, (err, user) => {
			console.log("What is", user);
			cb(err, usr);
		});
	}
};
