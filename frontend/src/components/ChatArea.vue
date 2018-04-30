<template>
    <div class="chat-area">
        <ul class="list-group list-group-flush">
            <li v-for="message in messages" :key="message.id" class="list-group-item">
                <strong>{{ message.user }}</strong>
				{{ message.msg }}
		    </li>
	    </ul>
    </div>
</template>

<script>
import Vue from "vue";

export default {
    name: "ChatArea",
    props: ["messages"],
	data() {
		return {};
	},
	methods: {
	}
};
</script>