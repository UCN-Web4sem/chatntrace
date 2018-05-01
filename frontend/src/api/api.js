import { events } from "commonsettings";

state.messages = state.messages || [];

export default {
	createUser(username) {
		socket.emit(events.CREATE_USER, username);
	},
	createLobby(lobbyname) {
		socket.emit(events.CREATE_LOBBY, lobbyname);
	},
	sendMessage(content) {
		socket.emit(events.SEND_MESSAGE, content);
		state.messages.push(content);
	}
};
