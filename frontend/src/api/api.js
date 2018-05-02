import { events } from "commonsettings";

state.messages = state.messages || [];

export default {
	createUser(username) {
		socket.emit(events.CREATE_USER, username);
	},
	createLobby(lobbyname) {
		socket.emit(events.CREATE_LOBBY, lobbyname);
	},
	joinLobby(lobby, user) {
		socket.emit(events.JOIN_LOBBY, lobby, user);
	},
	leaveLobby(lobby, user) {
		socket.emit(events.LEAVE_LOBBY, lobby, user);
  },
	sendMessage(content) {
		socket.emit(events.SEND_MESSAGE, content);
		state.messages.push(content);
	}
};
