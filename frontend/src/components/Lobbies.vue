<template>
	<div>
		<create-lobby-modal></create-lobby-modal>
		<button class="btn btn-success btn-lg" type="button" data-toggle="modal" data-target="#CreateLobbyModal">Create a new lobby</button>
		<div class="lobby-list">
			<strong>Lobbies</strong>
			<ul class="list-group">
				<li v-for="lobby in lobbies" :key="lobby.id" v-on:click="joinLobby(lobby)" class="list-group-item" v-bind:class="{ active: lobby.isActive }">{{ lobby.name }}</li>
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
		joinLobby: function(lobby) {
			// checks if there is a lobby already joined
			if (this.currentLobby != null) {
				this.currentLobby.isActive = false;
				api.leaveLobby(this.currentLobby, state.user);
			}
			console.log("noget noget", lobby, "and ", state.user);
			// joins the lobby that was clicked on
			api.joinLobby(lobby, state.user);
			// gets and sets the lobby that was clicked on to active
			lobby.isActive = true;
			// sets the old lobby to inactive
			this.currentLobby = lobby;
			// forces vue model to update
			this.$forceUpdate();
		}
	},
	mounted() {
		api.getAllLobbies(lobbies => {
			this.lobbies = lobbies;
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