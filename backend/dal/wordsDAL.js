const db = require("./firebase").child("words/");

module.exports = {
	getAll(cb) {
		db.once("value").then(snapshot => {
			const val = snapshot.val();
			const words = Object.keys(val).map(key => val[key]);
			cb(words);
		});
	},
	getRandom(cb) {
		const rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
		db
			.orderByKey()
			.equalTo(rand.toString())
			.once("child_added", function(snapshot) {
                const word = (snapshot.val());
                cb(word);
			});
	}
};
