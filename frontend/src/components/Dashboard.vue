<template>
	<div class="Container">
		<div class="Left"><lobbies></lobbies></div>
		<div class="Middle">Game View</div>
		<div class="Right">Chat View</div>
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
/* See https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/ */

/*This is our main wrapping element, it's made 100vh high to ensure it is always the correct size and then moved into place and padded with negative margin and padding*/
.Container {
	display: flex;
	overflow: hidden;
	height: 100vh;
	position: relative;
	width: 100%;
	backface-visibility: hidden;
	will-change: overflow;
}
/*All the scrollable sections should overflow and be whatever height they need to be. As they are flex-items (due to being inside a flex container) they could be made to stretch full height at all times if needed.
WebKit inertia scrolling is being added here for any present/future devices that are able to make use of it.
*/
.Left,
.Middle,
.Right {
	overflow: auto;
	height: auto;
	/* padding: 0.5rem; */
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none;
	/* resize: horizontal; */
}
/*Entirely optional – just wanted to remove the scrollbar on WebKit browsers as I find them ugly*/
.Left::-webkit-scrollbar,
.Middle::-webkit-scrollbar,
.Right::-webkit-scrollbar {
	display: none;
}
/*  Left and Right are set sizes while the Middle is set to flex one so it occupies all remaining space. This could be set as a width too if prefereable, perhaps using calc.*/
.Left {
	width: 12.5rem;
	background-color: red;
}

.Middle {
	flex: 1;
	background-color: green;
}

.Right {
	width: 12.5rem;
	background-color: blue;
}
</style>