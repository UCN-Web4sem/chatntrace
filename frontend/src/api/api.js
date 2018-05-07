import { events } from "commonsettings";
import axios from "axios";

state.messages = state.messages || [];

export default {
	createUser(username) {
		socket.emit(events.CREATE_USER, username);
	},
	createLobby(lobbyname, cb) {
		axios
			.post("/api/lobby", { name: lobbyname })
			.then(response => {
				cb(null, response.data);
			})
			.catch(err => {
				console.error(err);
				cb(err, null);
			});
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
	},

	getAllLobbies(cb) {
		axios
			.get("/api/lobby")
			.then(response => {
				cb(response.data);
			})
			.catch(err => {
				console.error(err);
			});
	}
};
