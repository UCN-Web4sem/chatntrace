const model = require("../model");
const uuidv4 = require("uuid/v4");
const DAL = require("../dal");

module.exports = {
	create: name => {
		let usr = new model.User(uuidv4(), name);
		DAL.user.create(usr);
		return usr;
	}
};
