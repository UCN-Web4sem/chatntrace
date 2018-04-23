<template>
	<form>
		<div class="form-group">
			<label for="usernameInput">User Name</label>
			<input v-model="username" type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter user name">
			<small id="usernameHelp" class="form-text text-muted">The nick name that other user will see</small>
		</div>
		<button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
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