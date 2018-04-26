import { events } from "commonsettings";

export default {
	createUser(username) {
		socket.emit(events.CREATE_USER, username);
	}
};
