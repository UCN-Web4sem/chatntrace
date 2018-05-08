<template>
	<div class="gameview">
		<canvas id="game-canvas"></canvas>
	</div>
</template>

<script>
import api from "@/api/api";
import Vue from "vue";

export default {
	name: "GameView",
	data() {
		return {};
	},
	methods: {},
	mounted() {
		const c = document.getElementById("game-canvas");

		c.style.width = "100%";
		c.style.height = "100%";
		c.width = c.offsetWidth;
		c.height = c.offsetHeight;

		const ctx = c.getContext("2d");

		let i = 0;
		setInterval(() => {
			ctx.font = "48px serif";
			ctx.fillText(
				"Hello Canvas",
				Math.random() * (250 + i),
				Math.random() * (250 + i)
			);
			i += 100;
		}, 1000 / 12);

		setInterval(() => {
			ctx.clearRect(0, 0, c.width, c.height);
			i = 0;
		}, 1000);
	}
};
</script>

<style>
#game-canvas {
	background-color: beige;
}

.gameview {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
}
</style>