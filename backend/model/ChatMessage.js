module.exports = class ChatMessage {
	constructor(id, content, createdAt) {
		this.id = id;
		this.content = content;
		this.createdAt = createdAt;
	}
};
