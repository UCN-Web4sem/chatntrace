import { events } from "commonsettings";

let state = {
	lobbies: []
};

socket.on(events.ALL_LOBBIES, lobbies => (state.lobbies = lobbies));
socket.on(events.NEW_LOBBY, lobby => state.lobbies.push(lobby));

export default {
	state: state,
	createUser(username) {
		socket.emit(events.CREATE_USER, username);
	}
};
