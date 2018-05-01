<template>
		<div class="form-group">
			<label for="lobbynameInput">Lobby Name</label>
			<input v-model="lobbyName" type="text" class="form-control" id="lobbynameInput" aria-describedby="lobbynameHelp" placeholder="Enter lobbyname">
			<small id="lobbynameHelp" class="form-text text-muted">Lobby name</small>
			<button @click="onSubmit" type="submit" class="btn btn-success" data-dismiss="modal">Create lobby</button>
		</div>
</template>

<script>
import api from "@/api/api";

export default {
	name: "CreateLobby",
	data() {
		return {
			lobbyName: ""
		};
	},
	methods: {
		onSubmit() {
			// TODO: Call the api
			api.createLobby(this.lobbyName);
		}
	}
};
</script>

<style>

</style>