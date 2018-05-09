module.exports = class Lobby {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.users = [];
		this.messages = [];
		this.joined = 0;
		this.left = 0;
	}
};
