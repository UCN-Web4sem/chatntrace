<template>
	<div class="gameview">
		<canvas id="game-canvas"></canvas>
	</div>
</template>

<script>
import api from "@/api/api";
import { events } from "commonsettings";
import Vue from "vue";

export default {
	name: "GameView",
	data() {
		return {
			word: "Secret",
			timeLeftOfRound: 60
		};
	},
	computed: {
		underscoredWord: function() {
			return this.word.replace(/[a-zA-z]/g, "_ "); //.split("_ ");
		}
	},
	methods: {},
	mounted() {
		// Setup canvas drawing
		(() => {
			const randInt = (min, max) =>
				Math.floor(Math.random() * (max - min + 1)) + min;

			const c = document.getElementById("game-canvas");
			const newPoint = e => {
				return {
					// Because the canvas is in the middle we have to remove the offset
					x: e.clientX - c.offsetLeft,
					y: e.clientY - c.offsetTop,
					width: randInt(3, 5)
				};
			};

			c.style.width = "100%";
			c.style.height = "100%";
			c.width = c.offsetWidth;
			c.height = c.offsetHeight;

			const ctx = c.getContext("2d");

			ctx.lineJoin = ctx.lineCap = "round";

			let isDrawing = false;
			let points = [];

			c.onmousedown = e => {
				isDrawing = true;
				points.push(newPoint(e));
			};
			c.onmousemove = e => {
				if (!isDrawing) return;
				points.push(newPoint(e));

				for (var i = 1; i < points.length; i++) {
					const prev = points[i - 1];
					const next = points[i];

					ctx.beginPath();
					ctx.moveTo(prev.x, prev.y);
					ctx.lineWidth = points[i].width;
					ctx.lineTo(next.x, next.y);
					ctx.stroke();
				}
			};
			c.onmouseup = () => {
				isDrawing = false;
				points = [];
			};
		})();
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