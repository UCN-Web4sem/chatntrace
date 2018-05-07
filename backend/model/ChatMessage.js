module.exports = class ChatMessage {
	constructor(id, content, createdAt, byUser) {
		this.id = id;
		this.content = content;
		this.createdAt = createdAt;
		this.byUser = byUser;
	}
};
