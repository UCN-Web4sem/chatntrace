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

			const ctx = c.getContext("2d");

			let oldWidth = c.width;
			let oldHeight = c.height;
			const resizeCanvas = () => {
				const imgData = ctx.getImageData(0, 0, oldWidth, oldHeight);
				c.style.width = "100%";
				c.style.height = "100%";
				oldWidth = c.width = c.offsetWidth;
				oldHeight = c.height = c.offsetHeight;

				ctx.putImageData(imgData, 0, 0);
			};
			resizeCanvas();
			window.addEventListener("resize", resizeCanvas, false);

			ctx.lineJoin = ctx.lineCap = "round";

			ctx.strokeStyle = "black";

			let isDrawing = false;
			let points = [];

			const onmousedown = point => {
				isDrawing = true;
				points.push(point);
			};
			socket.on(events.GAME_ON_MOUSE_DOWN, onmousedown);
			c.onmousedown = e => {
				const p = newPoint(e);
				onmousedown(p);
				socket.emit(events.GAME_ON_MOUSE_DOWN, p);
			};

			const onmousemove = point => {
				points.push(point);
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
			socket.on(events.GAME_ON_MOUSE_MOVE, onmousemove);
			c.onmousemove = e => {
				if (!isDrawing) return;
				const p = newPoint(e);
				onmousemove(p);
				socket.emit(events.GAME_ON_MOUSE_MOVE, p);
			};

			const onmouseup = () => {
				isDrawing = false;
				points = [];
			};
			socket.on(events.GAME_ON_MOUSE_UP, onmouseup);
			c.onmouseup = () => {
				onmouseup();
				socket.emit(events.GAME_ON_MOUSE_UP);
			};

			socket.on(events.GAME_EVENT_HISTORY, history => {
				ctx.clearRect(0, 0, c.width, c.height);
				let handlers = {};
				handlers[events.GAME_ON_MOUSE_DOWN] = onmousedown;
				handlers[events.GAME_ON_MOUSE_MOVE] = onmousemove;
				handlers[events.GAME_ON_MOUSE_UP] = onmouseup;
				history.forEach(evnt => {
					const { event, args } = evnt;
					const handler = handlers[event];
					handler.apply(null, args);
				});
			});
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