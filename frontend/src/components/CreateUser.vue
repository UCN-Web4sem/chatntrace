<template>
	<form>
		<div class="form-group">
			<label for="usernameInput">Username</label>
			<input v-model="username" type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username">
			<small id="usernameHelp" class="form-text text-muted">The nickname that other users will see</small>
		</div>
			<button @click="onSubmit" type="submit" class="btn btn-success" data-dismiss="modal">Play</button>
	</form>
</template>

<script>
import api from "@/api/api";
import { events } from "commonsettings";
import router from "@/router/index.js";

export default {
	name: "CreateUser",
	data() {
		return {
			username: ""
		};
	},
	methods: {
		onSubmit() {
			// TODO: Call the api
			api.createUser(this.username, (err, user) => {
				if (err) return console.error(err);
				state.user = user;
				router.push("Dashboard");
			});
		}
	}
};
</script>

<style>

</style>