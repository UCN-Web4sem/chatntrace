import { events } from "commonsettings";

console.log("Hello from api");

export default {
	createUser(username) {
		socket.emit(events.CREATE_USER, username);
	},
	someOtherMethod() {}
};
