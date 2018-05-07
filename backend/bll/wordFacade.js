const model = require("../model");
const DAL = require("../dal");

module.exports = {
	create: () => {
		let words = new model.Words();
		return words;
	},
	getAll(cb) {
		DAL.words.getAll(cb);
	},
	getRandom() {
        DAL.words.getRandom();
	}
};
