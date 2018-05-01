<template>
	<div>
		<create-lobby-modal></create-lobby-modal>
		<button class="btn btn-success btn-lg" type="button" data-toggle="modal" data-target="#CreateLobbyModal">Create a new lobby</button>
		<div class="lobby-list">
			<strong>Lobbies</strong>
			<ul class="list-group">
				<li v-for="lobby in lobbies" :key="lobby.id" v-on:click="joinLobby(lobby)" class="list-group-item">{{ lobby.name }}</li>
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
			lobbies: [],
			currentLobby: {}
		};
	},
	methods: {
		onSubmit() {
			// TODO: Call the api
			// api.createUser(this.username);
		},
		joinLobby: function(lobby) {
			console.log("noget noget", lobby, "and ", state.user);
			api.joinLobby(lobby, state.user);
			currentLobby = lobby;
		}
	},
	mounted() {
		socket.on(events.ALL_LOBBIES, lobbies => {
			this.lobbies = lobbies;
			console.log(lobbies);
			socket.on(events.NEW_LOBBY, lobby => {
				this.lobbies.push(lobby);
			});
		});
	}
};
</script>

<style>

</style>