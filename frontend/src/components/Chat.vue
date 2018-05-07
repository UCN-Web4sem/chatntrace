<template>
    <div>
        <chat-area :messages="messages"></chat-area>
        <chat-form :send="sendMessage" v-model="message"></chat-form>
    </div>
</template>

<script>
import api from "@/api/api";
import { events } from "commonsettings";

export default {
	name: "Chat",
	data() {
		return {
			message: "",
			messages: []
		};
	},
	methods: {
		sendMessage() {
			const msg = this.message;
			api.sendMessage(msg);
			this.message = "";

			// this.messages.push({
			// 	id: this.messages.length + 1,
			// 	user: "me",
			// 	msg: msg
			// });
		}
	},
	mounted() {
		socket.on(events.NEW_MESSAGE, msg => {
			console.log("GOT NEW MSG", msg);
			this.messages.push(msg);
		});
	}
};
</script>
