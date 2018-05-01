const model = require("../model");
const DAL = require("../dal");
const uuidv4 = require("uuid/v4");

module.exports = {
    create: (content, cb) => {

    let message = new model.ChatMessage(uuidv4(), content, new Date());
		DAL.message.create(message, (err, message) => {
			cb(err, message);
		});
}
};