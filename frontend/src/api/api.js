import { events } from "commonsettings";
import axios from "axios";
import v4 from "uuid/v4";

state.messages = state.messages || [];
state.joinedLobby = state.joinedLobby || {};

export default {
	setInitialID() {
		state.socketID = v4();
		console.log("the initial ID is now", state.socketID);
		socket.emit(events.INITIAL_ID, state.socketID);
	},

	createUser(username, cb) {
		axios
			.post("/api/user", {
				name: username,
				socketID: state.socketID
			})
			.then(response => {
				cb(null, response.data);
			})
			.catch(err => {
				console.error(err);
				cb(err, null);
				document.write(err.response.data);
			});
	},
	createLobby(lobbyname, cb) {
		axios
			.post("/api/lobby", { name: lobbyname, socketID: state.socketID })
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
