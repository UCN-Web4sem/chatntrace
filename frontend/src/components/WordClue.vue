<template>
    <div id="wordClue">
        <ul id="list">
            <li>_</li>
            <li>_</li>
            <li>_</li>
            <li>_</li>
            <li>_</li>
        </ul>
        <button @click="onSubmit" type="submit" class="btn btn-primary">Get Word</button>
    </div>
</template>

<script>
import api from "@/api/api";
export default {
	name: "FrontPageUser",
	data() {
		return {};
	},
	methods: {
		onSubmit() {
			api.getRandomWord(word => {
				console.log(this.word);
			});
		}
	}
};
</script>

<style>
ul#list li {
	padding: 2px;
	display: inline;
	font-size: 40px;
	font-weight: bold;
}

#wordClue {
	float: right;
	margin-right: 20px;
}
</style>
