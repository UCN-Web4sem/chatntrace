<template>
	<div class="dashboard container-fluid">
		<div class="row">
			<div class="right-side-bar col-1"><lobbies></lobbies></div>
			<div class="middle-side-bar col-8">Game View</div>
			<div class="left-side-bar col-3">Chat View</div>
		</div>
	</div>
</template>

<script>
import api from "@/api/api";
import Vue from "vue";
import Lobbies from "@/components/Lobbies";

Vue.component("lobbies", Lobbies);

export default {
	name: "Dashboard",
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.dashboard > .row {
	height: 100vh;
}

.right-side-bar {
	background-color: red;
}
.middle-side-bar {
	background-color: green;
}
.left-side-bar {
	background-color: blue;
}
</style>