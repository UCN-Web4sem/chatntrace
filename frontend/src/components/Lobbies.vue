<template>
	<div>
		<create-lobby-modal></create-lobby-modal>
		<button class="btn btn-success btn-lg" type="button" data-toggle="modal" data-target="#CreateLobbyModal">Create a new lobby</button>
		<div class="lobby-list">
			<strong>Lobbies</strong>
			<ul class="list-group">
				<li v-for="(lobby,i) in lobbies" :key="lobby.id" v-on:click="joinLobby(i)" class="list-group-item" v-bind:class="{ active: lobbies[i].isActive }">{{ lobby.name }}</li>
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
			currentLobby: null
		};
	},
	methods: {
		onSubmit() {
			// TODO: Call the api
			// api.createUser(this.username);
		},
		joinLobby: function(i) {
			if (this.currentLobby != null) {
				this.currentLobby.isActive = false;
				api.leaveLobby(this.currentLobby, state.user);
			}
			console.log("noget noget", this.lobbies[i], "and ", state.user);
			api.joinLobby(this.lobbies[i], state.user);
			let lobby = this.lobbies[i];
			lobby.isActive = true;
			this.lobbies[i] = lobby;
			this.currentLobby = this.lobbies[i];
			this.$forceUpdate();
		}
	},
	mounted() {
		socket.on(events.ALL_LOBBIES, lobbies => {
			this.lobbies = lobbies;
			this.lobbies.forEach(lobby => {
				lobby.isActive = false;
			});
			socket.on(events.NEW_LOBBY, lobby => {
				lobby.isActive = false;
				this.lobbies.push(lobby);
			});
		});
	}
};
</script>

<style>

</style>