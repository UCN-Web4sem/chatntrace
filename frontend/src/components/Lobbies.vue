<template>
	<div>
		<CreateLobbyModal></CreateLobbyModal>
		<button class="btn btn-success btn-lg" type="button" data-toggle="modal" data-target="#CreateLobbyModal">Create a new lobby</button>
		<div class="lobby-list">
			<strong>Lobbies</strong>
			<ul class="list-group">
				<li v-for="lobby in lobbies" :key="lobby.id" class="list-group-item">{{ lobby.name }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import api from "@/api/api";
import { events } from "commonsettings";

export default {
	name: "Lobbies",
	data() {
		return {
			lobbies: []
		};
	},
	methods: {
		onSubmit() {
			// TODO: Call the api
			// api.createUser(this.username);
		}
	},
	mounted() {
		console.log("do something");
		socket.on(events.ALL_LOBBIES, lobbies => {
			this.lobbies = lobbies;
			console.log("hej", lobbies);
			socket.on(events.NEW_LOBBY, lobby => {
				console.log("hello", lobby);
				this.lobbies.push(lobby);
			});
		});
	}
};
</script>

<style>

</style>