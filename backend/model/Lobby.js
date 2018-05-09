module.exports = class Lobby {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.users = [];
		this.messages = [];
	}
};
