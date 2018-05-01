<template>
   <form class="chat-form" action="#">
       <div class="input-group chat-input">
		    <input :value="value" spellcheck="true" autocomplete="off" class="form-control" aria-label="Message">
			<button @click="onSubmit" class="btn btn-primary" type="submit">Send</button>
		</div>
	</form>
</template>

<script>
import Vue from "vue";

export default {
    name: "ChatArea",
    props: ["send", "value"],
	data() {
		return {};
	},
	methods: {
        onSubmit() {
            // TODO: Call backend when sending message
		}
	}
};
</script>

<style>
.chat-form {
    border-color: black;
    border-bottom: solid;
    border-right: solid;
    border-left: solid;
}
</style>