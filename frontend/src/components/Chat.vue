<template>
    <div>
        <chat-area></chat-area>
        <chat-form :send="sendMessage" v-model="message"></chat-form>
    </div>
</template>

<script>
import api from "@/api/api";

export default {
	name: "Chat",
	data() {
		return {
			message: ""
		};
	},
	methods: {
		sendMessage() {
			const msg = this.message;
			api.sendMessage(msg);
			this.message = "";
		}
	}
};
</script>
