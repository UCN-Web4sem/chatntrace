<template>
	<div class="lobby-list">
		<strong>Lobbies</strong>
		<ul class="list-group">
			<li v-for="lobby in lobbies" :key="lobby.id" class="list-group-item">{{ lobby.name }}</li>
		</ul>
	</div>
</template>

<script>
import api from "@/api/api";

export default {
	name: "Lobbies",
	data() {
		return {
			lobbies: api.state.lobbies
		};
	},
	methods: {
		onSubmit() {
			// TODO: Call the api
			// api.createUser(this.username);
		}
	}
};
</script>

<style>

</style>