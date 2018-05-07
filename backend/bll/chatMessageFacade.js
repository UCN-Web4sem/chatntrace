const model = require("../model");
const DAL = require("../dal");
const uuidv4 = require("uuid/v4");

module.exports = {
	create: (content, byUser, cb) => {
		let message = new model.ChatMessage(
			uuidv4(),
			content,
			new Date().getTime(),
			byUser
		);
		DAL.message.create(message, (err, msg) => {
			cb(err, message);
		});
	}
};
