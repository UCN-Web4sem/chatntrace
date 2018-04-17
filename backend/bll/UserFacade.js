const model = require("../model");
const uuidv4 = require("uuid/v4");
const UserDal = require("../dal");

module.exports = {
	create: name => {
		let usr = new model.User(uuidv4(), name);
		UserDal.create(usr);
		return usr;
	}
};
