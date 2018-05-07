<template>
    <div class="chat-area">
        <ul class="list-group list-group-flush">
            <li v-for="message in messages" :key="message.id" class="list-group-item">
                <strong>{{ message.byUser.name }}</strong>
				{{ message.content }}
		    </li>
	    </ul>
    </div>
</template>

<script>
export default {
	name: "ChatArea",
	props: ["messages"],
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.chat-area {
	height: 95.5vh;
	border-color: black;
	border: solid;
}
</style>