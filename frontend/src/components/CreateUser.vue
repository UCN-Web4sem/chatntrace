<template>
	<form>
		<div class="form-group">
			<label for="usernameInput">Username</label>
			<input v-model="username" type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username">
			<small id="usernameHelp" class="form-text text-muted">The nickname that other users will see</small>
		</div>
		<button @click="onSubmit" type="submit" class="btn btn-success">Play</button>
	</form>
</template>

<script>
import api from "@/api/api";

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
			api.createUser(this.username);
		}
	}
};
</script>

<style>

</style>